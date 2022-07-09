import { SecretValue, Stack, StackProps } from 'aws-cdk-lib';
import { BuildSpec, LinuxBuildImage, PipelineProject } from 'aws-cdk-lib/aws-codebuild';
import { Artifact, Pipeline } from 'aws-cdk-lib/aws-codepipeline';
import { GitHubSourceAction, CodeBuildAction, CloudFormationCreateUpdateStackAction } from 'aws-cdk-lib/aws-codepipeline-actions';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class PipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

   const pipleline = new Pipeline(this, 'Pipeline', {
      pipelineName:'Pipeline',
      crossAccountKeys: false
   });

   const sourceOutput = new Artifact('SourceOutput');

   //source stage connects to github and generates the sourceOutput
   pipleline.addStage({
      stageName: 'Source',
      actions:[
        new GitHubSourceAction({
          owner: 'jgopireddy',
          repo: 'code-pipeline',
          branch: 'main',
          actionName: 'Pipeline_Source',
          oauthToken: SecretValue.secretsManager('github-token'),
          output: sourceOutput
        })
      ]
   });

   const cdkBuildOutput = new Artifact('cdkBuildOutput');
   //Build stage takes the sourceOutput, run the buidspec and generates the output
   pipleline.addStage({
    stageName: 'Build',
    actions: [
      new CodeBuildAction({
        actionName: 'Cdk_Build',
        input: sourceOutput,
        outputs: [cdkBuildOutput],
        project: new PipelineProject(this, 'CdkBuildProject',{
          environment: {
            buildImage: LinuxBuildImage.STANDARD_5_0
          },
          buildSpec: BuildSpec.fromSourceFilename('build-spec/cdk-build-spec.yml')
        })
      })
    ]
   })

   //Pipeline update stage, to deploy the stack automatically if there is any change
   //without doing cdk deploy manually
   pipleline.addStage({
    stageName: 'Pipeline_Update',
    actions:[
      new CloudFormationCreateUpdateStackAction({
        actionName: 'Pipeline_Update',
        stackName: 'PipelineStack',
        templatePath: cdkBuildOutput.atPath('PipelineStack.template.json'),
        adminPermissions: true
      })
    ]
   })

  }
}
