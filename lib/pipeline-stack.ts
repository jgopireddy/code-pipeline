import { BillingStack } from './billing-stack';
import { ServiceStack } from './service-stack';
import { SecretValue, Stack, StackProps } from 'aws-cdk-lib';
import { BuildSpec, LinuxBuildImage, PipelineProject } from 'aws-cdk-lib/aws-codebuild';
import { Artifact, IStage, Pipeline } from 'aws-cdk-lib/aws-codepipeline';
import { GitHubSourceAction, CodeBuildAction, CloudFormationCreateUpdateStackAction } from 'aws-cdk-lib/aws-codepipeline-actions';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class PipelineStack extends Stack {

  private readonly pipeline: Pipeline;
  private readonly cdkBuildOutput: Artifact;
  private readonly serviceBuildOutput: Artifact;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

   this.pipeline = new Pipeline(this, 'Pipeline', {
      pipelineName:'Pipeline',
      crossAccountKeys: false,
      restartExecutionOnUpdate: true
   });

   const cdkSourceOutput = new Artifact('CDKSourceOutput');
   const serviceSourceOutput = new Artifact('ServiceSourceOutput');

   //source stage connects to github and generates the sourceOutput
   this.pipeline.addStage({
      stageName: 'Source',
      actions:[
        new GitHubSourceAction({
          owner: 'jgopireddy',
          repo: 'code-pipeline',
          branch: 'main',
          actionName: 'Pipeline_Source',
          oauthToken: SecretValue.secretsManager('github-token'),
          output: cdkSourceOutput
        }),
        new GitHubSourceAction({
          owner: 'jgopireddy',
          repo: 'express-lambda',
          branch: 'master',
          actionName: 'Service_Source',
          oauthToken: SecretValue.secretsManager('github-token'),
          output: serviceSourceOutput
        })
      ]
   });

   this.cdkBuildOutput = new Artifact('CDKBuildOutput');
   this.serviceBuildOutput = new Artifact('ServiceBuildOutput');
   //Build stage takes the sourceOutput, run the buidspec and generates the output
   this.pipeline.addStage({
    stageName: 'Build',
    actions: [
      new CodeBuildAction({
        actionName: 'CDK_Build',
        input: cdkSourceOutput,
        outputs: [this.cdkBuildOutput],
        project: new PipelineProject(this, 'CdkBuildProject',{
          environment: {
            buildImage: LinuxBuildImage.STANDARD_5_0
          },
          buildSpec: BuildSpec.fromSourceFilename('build-spec/cdk-build-spec.yml')
        })
      }),
      new CodeBuildAction({
        actionName: 'Service_Build',
        input: serviceSourceOutput,
        outputs: [this.serviceBuildOutput],
        project: new PipelineProject(this, 'ServiceBuildProject',{
          environment: {
            buildImage: LinuxBuildImage.STANDARD_5_0
          },
          buildSpec: BuildSpec.fromSourceFilename('build-specs/service-build-spec.yml')
        })
      })
    ]
   })

   //Pipeline update stage, to deploy the stack automatically if there is any change
   //without doing cdk deploy manually
   this.pipeline.addStage({
    stageName: 'Pipeline_Update',
    actions:[
      new CloudFormationCreateUpdateStackAction({
        actionName: 'Pipeline_Update',
        stackName: 'PipelineStack',
        templatePath: this.cdkBuildOutput.atPath('PipelineStack.template.json'),
        adminPermissions: true
      })
    ]
   })

  }

  public addServiceStage(serviceStack: ServiceStack, stageName: string): IStage {
     return this.pipeline.addStage({
      stageName: stageName,
      actions:[
        new CloudFormationCreateUpdateStackAction({
          actionName: 'Service_Update',
          stackName: serviceStack.stackName,
          templatePath: this.cdkBuildOutput.atPath(`${serviceStack.stackName}.template.json`),
          adminPermissions: true,
          parameterOverrides: {
            ...serviceStack.serviceCode.assign(this.serviceBuildOutput.s3Location)
          },
          extraInputs: [this.serviceBuildOutput]
        })
      ]
    })
  }

  public addBillingStackToStage(billingStack: BillingStack, stage: IStage){
    stage.addAction(
      new CloudFormationCreateUpdateStackAction({
        actionName: 'Billing_Update',
        stackName: billingStack.stackName,
        templatePath: this.cdkBuildOutput.atPath(`${billingStack.stackName}.template.json`),
        adminPermissions: true
      })
    )
  }
}
