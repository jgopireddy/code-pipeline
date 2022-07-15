import { ServiceStack } from './../lib/service-stack';
import * as cdk from 'aws-cdk-lib';
// import { Template } from 'aws-cdk-lib/assertions';
import * as Pipeline from '../lib/pipeline-stack';
import {Template, Capture, Match} from 'aws-cdk-lib/assertions';
import { Service } from 'aws-cdk-lib/aws-servicediscovery';

// example test. To run these tests, uncomment this file along with the
// example resource in lib/pipeline-stack.ts
test('Pipeline Stack Created', () => {
  const app = new cdk.App();
//     // WHEN
  const stack = new Pipeline.PipelineStack(app, 'MyTestStack');
//     // THEN
  const template = Template.fromStack(stack);

  //template.resourceCountIs('AWS::SQS::Queue', 0);

  expect(template).toMatchSnapshot();
});

test('Adding service stage', () =>{

  //GIVEN
  const app = new cdk.App();
  const serviceStack = new ServiceStack(app, "ServiceStack");
  const pipelineStack = new Pipeline.PipelineStack(app, "PipelineStack")

  //WHEN
  pipelineStack.addServiceStage(serviceStack, 'Test');

  //THEN
  Template.fromStack(pipelineStack).hasResourceProperties(
    "AWS::CodePipeline::Pipeline",
    {
      Stages: Match.arrayWith([
        Match.objectLike({
          Name: 'Test'
        })
      ])
    }
  );
});
