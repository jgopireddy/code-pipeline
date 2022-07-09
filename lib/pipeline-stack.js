"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelineStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_codebuild_1 = require("aws-cdk-lib/aws-codebuild");
const aws_codepipeline_1 = require("aws-cdk-lib/aws-codepipeline");
const aws_codepipeline_actions_1 = require("aws-cdk-lib/aws-codepipeline-actions");
// import * as sqs from 'aws-cdk-lib/aws-sqs';
class PipelineStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const pipleline = new aws_codepipeline_1.Pipeline(this, 'Pipeline', {
            pipelineName: 'Pipeline',
            crossAccountKeys: false
        });
        const sourceOutput = new aws_codepipeline_1.Artifact('SourceOutput');
        //source stage connects to github and generates the sourceOutput
        pipleline.addStage({
            stageName: 'Source',
            actions: [
                new aws_codepipeline_actions_1.GitHubSourceAction({
                    owner: 'jgopireddy',
                    repo: 'code-pipeline',
                    branch: 'main',
                    actionName: 'Pipeline_Source',
                    oauthToken: aws_cdk_lib_1.SecretValue.secretsManager('github-token'),
                    output: sourceOutput
                })
            ]
        });
        const cdkBuildOutput = new aws_codepipeline_1.Artifact('cdkBuildOutput');
        //Build stage takes the sourceOutput, run the buidspec and generates the output
        pipleline.addStage({
            stageName: 'Build',
            actions: [
                new aws_codepipeline_actions_1.CodeBuildAction({
                    actionName: 'Cdk_Build',
                    input: sourceOutput,
                    outputs: [cdkBuildOutput],
                    project: new aws_codebuild_1.PipelineProject(this, 'CdkBuildProject', {
                        environment: {
                            buildImage: aws_codebuild_1.LinuxBuildImage.STANDARD_5_0
                        },
                        buildSpec: aws_codebuild_1.BuildSpec.fromSourceFilename('build-spec/cdk-build-spec.yml')
                    })
                })
            ]
        });
    }
}
exports.PipelineStack = PipelineStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmUtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBNkQ7QUFDN0QsNkRBQXdGO0FBQ3hGLG1FQUFrRTtBQUNsRSxtRkFBMkY7QUFFM0YsOENBQThDO0FBRTlDLE1BQWEsYUFBYyxTQUFRLG1CQUFLO0lBQ3RDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBa0I7UUFDMUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFekIsTUFBTSxTQUFTLEdBQUcsSUFBSSwyQkFBUSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUU7WUFDOUMsWUFBWSxFQUFDLFVBQVU7WUFDdkIsZ0JBQWdCLEVBQUUsS0FBSztTQUN6QixDQUFDLENBQUM7UUFFSCxNQUFNLFlBQVksR0FBRyxJQUFJLDJCQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFbEQsZ0VBQWdFO1FBQ2hFLFNBQVMsQ0FBQyxRQUFRLENBQUM7WUFDaEIsU0FBUyxFQUFFLFFBQVE7WUFDbkIsT0FBTyxFQUFDO2dCQUNOLElBQUksNkNBQWtCLENBQUM7b0JBQ3JCLEtBQUssRUFBRSxZQUFZO29CQUNuQixJQUFJLEVBQUUsZUFBZTtvQkFDckIsTUFBTSxFQUFFLE1BQU07b0JBQ2QsVUFBVSxFQUFFLGlCQUFpQjtvQkFDN0IsVUFBVSxFQUFFLHlCQUFXLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQztvQkFDdEQsTUFBTSxFQUFFLFlBQVk7aUJBQ3JCLENBQUM7YUFDSDtTQUNILENBQUMsQ0FBQztRQUVILE1BQU0sY0FBYyxHQUFHLElBQUksMkJBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3RELCtFQUErRTtRQUMvRSxTQUFTLENBQUMsUUFBUSxDQUFDO1lBQ2xCLFNBQVMsRUFBRSxPQUFPO1lBQ2xCLE9BQU8sRUFBRTtnQkFDUCxJQUFJLDBDQUFlLENBQUM7b0JBQ2xCLFVBQVUsRUFBRSxXQUFXO29CQUN2QixLQUFLLEVBQUUsWUFBWTtvQkFDbkIsT0FBTyxFQUFFLENBQUMsY0FBYyxDQUFDO29CQUN6QixPQUFPLEVBQUUsSUFBSSwrQkFBZSxDQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBQzt3QkFDbkQsV0FBVyxFQUFFOzRCQUNYLFVBQVUsRUFBRSwrQkFBZSxDQUFDLFlBQVk7eUJBQ3pDO3dCQUNELFNBQVMsRUFBRSx5QkFBUyxDQUFDLGtCQUFrQixDQUFDLCtCQUErQixDQUFDO3FCQUN6RSxDQUFDO2lCQUNILENBQUM7YUFDSDtTQUNELENBQUMsQ0FBQTtJQUVILENBQUM7Q0FDRjtBQTlDRCxzQ0E4Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZWNyZXRWYWx1ZSwgU3RhY2ssIFN0YWNrUHJvcHMgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBCdWlsZFNwZWMsIExpbnV4QnVpbGRJbWFnZSwgUGlwZWxpbmVQcm9qZWN0IH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWNvZGVidWlsZCc7XG5pbXBvcnQgeyBBcnRpZmFjdCwgUGlwZWxpbmUgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtY29kZXBpcGVsaW5lJztcbmltcG9ydCB7IEdpdEh1YlNvdXJjZUFjdGlvbiwgQ29kZUJ1aWxkQWN0aW9uIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWNvZGVwaXBlbGluZS1hY3Rpb25zJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuLy8gaW1wb3J0ICogYXMgc3FzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1zcXMnO1xuXG5leHBvcnQgY2xhc3MgUGlwZWxpbmVTdGFjayBleHRlbmRzIFN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBTdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgIGNvbnN0IHBpcGxlbGluZSA9IG5ldyBQaXBlbGluZSh0aGlzLCAnUGlwZWxpbmUnLCB7XG4gICAgICBwaXBlbGluZU5hbWU6J1BpcGVsaW5lJyxcbiAgICAgIGNyb3NzQWNjb3VudEtleXM6IGZhbHNlXG4gICB9KTtcblxuICAgY29uc3Qgc291cmNlT3V0cHV0ID0gbmV3IEFydGlmYWN0KCdTb3VyY2VPdXRwdXQnKTtcblxuICAgLy9zb3VyY2Ugc3RhZ2UgY29ubmVjdHMgdG8gZ2l0aHViIGFuZCBnZW5lcmF0ZXMgdGhlIHNvdXJjZU91dHB1dFxuICAgcGlwbGVsaW5lLmFkZFN0YWdlKHtcbiAgICAgIHN0YWdlTmFtZTogJ1NvdXJjZScsXG4gICAgICBhY3Rpb25zOltcbiAgICAgICAgbmV3IEdpdEh1YlNvdXJjZUFjdGlvbih7XG4gICAgICAgICAgb3duZXI6ICdqZ29waXJlZGR5JyxcbiAgICAgICAgICByZXBvOiAnY29kZS1waXBlbGluZScsXG4gICAgICAgICAgYnJhbmNoOiAnbWFpbicsXG4gICAgICAgICAgYWN0aW9uTmFtZTogJ1BpcGVsaW5lX1NvdXJjZScsXG4gICAgICAgICAgb2F1dGhUb2tlbjogU2VjcmV0VmFsdWUuc2VjcmV0c01hbmFnZXIoJ2dpdGh1Yi10b2tlbicpLFxuICAgICAgICAgIG91dHB1dDogc291cmNlT3V0cHV0XG4gICAgICAgIH0pXG4gICAgICBdXG4gICB9KTtcblxuICAgY29uc3QgY2RrQnVpbGRPdXRwdXQgPSBuZXcgQXJ0aWZhY3QoJ2Nka0J1aWxkT3V0cHV0Jyk7XG4gICAvL0J1aWxkIHN0YWdlIHRha2VzIHRoZSBzb3VyY2VPdXRwdXQsIHJ1biB0aGUgYnVpZHNwZWMgYW5kIGdlbmVyYXRlcyB0aGUgb3V0cHV0XG4gICBwaXBsZWxpbmUuYWRkU3RhZ2Uoe1xuICAgIHN0YWdlTmFtZTogJ0J1aWxkJyxcbiAgICBhY3Rpb25zOiBbXG4gICAgICBuZXcgQ29kZUJ1aWxkQWN0aW9uKHtcbiAgICAgICAgYWN0aW9uTmFtZTogJ0Nka19CdWlsZCcsXG4gICAgICAgIGlucHV0OiBzb3VyY2VPdXRwdXQsXG4gICAgICAgIG91dHB1dHM6IFtjZGtCdWlsZE91dHB1dF0sXG4gICAgICAgIHByb2plY3Q6IG5ldyBQaXBlbGluZVByb2plY3QodGhpcywgJ0Nka0J1aWxkUHJvamVjdCcse1xuICAgICAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgICAgICBidWlsZEltYWdlOiBMaW51eEJ1aWxkSW1hZ2UuU1RBTkRBUkRfNV8wXG4gICAgICAgICAgfSxcbiAgICAgICAgICBidWlsZFNwZWM6IEJ1aWxkU3BlYy5mcm9tU291cmNlRmlsZW5hbWUoJ2J1aWxkLXNwZWMvY2RrLWJ1aWxkLXNwZWMueW1sJylcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgXVxuICAgfSlcblxuICB9XG59XG4iXX0=