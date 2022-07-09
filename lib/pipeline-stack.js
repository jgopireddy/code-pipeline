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
                    branch: 'develop',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmUtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBNkQ7QUFDN0QsNkRBQXdGO0FBQ3hGLG1FQUFrRTtBQUNsRSxtRkFBMkY7QUFFM0YsOENBQThDO0FBRTlDLE1BQWEsYUFBYyxTQUFRLG1CQUFLO0lBQ3RDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBa0I7UUFDMUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFekIsTUFBTSxTQUFTLEdBQUcsSUFBSSwyQkFBUSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUU7WUFDOUMsWUFBWSxFQUFDLFVBQVU7WUFDdkIsZ0JBQWdCLEVBQUUsS0FBSztTQUN6QixDQUFDLENBQUM7UUFFSCxNQUFNLFlBQVksR0FBRyxJQUFJLDJCQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFbEQsZ0VBQWdFO1FBQ2hFLFNBQVMsQ0FBQyxRQUFRLENBQUM7WUFDaEIsU0FBUyxFQUFFLFFBQVE7WUFDbkIsT0FBTyxFQUFDO2dCQUNOLElBQUksNkNBQWtCLENBQUM7b0JBQ3JCLEtBQUssRUFBRSxZQUFZO29CQUNuQixJQUFJLEVBQUUsZUFBZTtvQkFDckIsTUFBTSxFQUFFLFNBQVM7b0JBQ2pCLFVBQVUsRUFBRSxpQkFBaUI7b0JBQzdCLFVBQVUsRUFBRSx5QkFBVyxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUM7b0JBQ3RELE1BQU0sRUFBRSxZQUFZO2lCQUNyQixDQUFDO2FBQ0g7U0FDSCxDQUFDLENBQUM7UUFFSCxNQUFNLGNBQWMsR0FBRyxJQUFJLDJCQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN0RCwrRUFBK0U7UUFDL0UsU0FBUyxDQUFDLFFBQVEsQ0FBQztZQUNsQixTQUFTLEVBQUUsT0FBTztZQUNsQixPQUFPLEVBQUU7Z0JBQ1AsSUFBSSwwQ0FBZSxDQUFDO29CQUNsQixVQUFVLEVBQUUsV0FBVztvQkFDdkIsS0FBSyxFQUFFLFlBQVk7b0JBQ25CLE9BQU8sRUFBRSxDQUFDLGNBQWMsQ0FBQztvQkFDekIsT0FBTyxFQUFFLElBQUksK0JBQWUsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUM7d0JBQ25ELFdBQVcsRUFBRTs0QkFDWCxVQUFVLEVBQUUsK0JBQWUsQ0FBQyxZQUFZO3lCQUN6Qzt3QkFDRCxTQUFTLEVBQUUseUJBQVMsQ0FBQyxrQkFBa0IsQ0FBQywrQkFBK0IsQ0FBQztxQkFDekUsQ0FBQztpQkFDSCxDQUFDO2FBQ0g7U0FDRCxDQUFDLENBQUE7SUFFSCxDQUFDO0NBQ0Y7QUE5Q0Qsc0NBOENDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VjcmV0VmFsdWUsIFN0YWNrLCBTdGFja1Byb3BzIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQnVpbGRTcGVjLCBMaW51eEJ1aWxkSW1hZ2UsIFBpcGVsaW5lUHJvamVjdCB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1jb2RlYnVpbGQnO1xuaW1wb3J0IHsgQXJ0aWZhY3QsIFBpcGVsaW5lIH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWNvZGVwaXBlbGluZSc7XG5pbXBvcnQgeyBHaXRIdWJTb3VyY2VBY3Rpb24sIENvZGVCdWlsZEFjdGlvbiB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1jb2RlcGlwZWxpbmUtYWN0aW9ucyc7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbi8vIGltcG9ydCAqIGFzIHNxcyBmcm9tICdhd3MtY2RrLWxpYi9hd3Mtc3FzJztcblxuZXhwb3J0IGNsYXNzIFBpcGVsaW5lU3RhY2sgZXh0ZW5kcyBTdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICBjb25zdCBwaXBsZWxpbmUgPSBuZXcgUGlwZWxpbmUodGhpcywgJ1BpcGVsaW5lJywge1xuICAgICAgcGlwZWxpbmVOYW1lOidQaXBlbGluZScsXG4gICAgICBjcm9zc0FjY291bnRLZXlzOiBmYWxzZVxuICAgfSk7XG5cbiAgIGNvbnN0IHNvdXJjZU91dHB1dCA9IG5ldyBBcnRpZmFjdCgnU291cmNlT3V0cHV0Jyk7XG5cbiAgIC8vc291cmNlIHN0YWdlIGNvbm5lY3RzIHRvIGdpdGh1YiBhbmQgZ2VuZXJhdGVzIHRoZSBzb3VyY2VPdXRwdXRcbiAgIHBpcGxlbGluZS5hZGRTdGFnZSh7XG4gICAgICBzdGFnZU5hbWU6ICdTb3VyY2UnLFxuICAgICAgYWN0aW9uczpbXG4gICAgICAgIG5ldyBHaXRIdWJTb3VyY2VBY3Rpb24oe1xuICAgICAgICAgIG93bmVyOiAnamdvcGlyZWRkeScsXG4gICAgICAgICAgcmVwbzogJ2NvZGUtcGlwZWxpbmUnLFxuICAgICAgICAgIGJyYW5jaDogJ2RldmVsb3AnLFxuICAgICAgICAgIGFjdGlvbk5hbWU6ICdQaXBlbGluZV9Tb3VyY2UnLFxuICAgICAgICAgIG9hdXRoVG9rZW46IFNlY3JldFZhbHVlLnNlY3JldHNNYW5hZ2VyKCdnaXRodWItdG9rZW4nKSxcbiAgICAgICAgICBvdXRwdXQ6IHNvdXJjZU91dHB1dFxuICAgICAgICB9KVxuICAgICAgXVxuICAgfSk7XG5cbiAgIGNvbnN0IGNka0J1aWxkT3V0cHV0ID0gbmV3IEFydGlmYWN0KCdjZGtCdWlsZE91dHB1dCcpO1xuICAgLy9CdWlsZCBzdGFnZSB0YWtlcyB0aGUgc291cmNlT3V0cHV0LCBydW4gdGhlIGJ1aWRzcGVjIGFuZCBnZW5lcmF0ZXMgdGhlIG91dHB1dFxuICAgcGlwbGVsaW5lLmFkZFN0YWdlKHtcbiAgICBzdGFnZU5hbWU6ICdCdWlsZCcsXG4gICAgYWN0aW9uczogW1xuICAgICAgbmV3IENvZGVCdWlsZEFjdGlvbih7XG4gICAgICAgIGFjdGlvbk5hbWU6ICdDZGtfQnVpbGQnLFxuICAgICAgICBpbnB1dDogc291cmNlT3V0cHV0LFxuICAgICAgICBvdXRwdXRzOiBbY2RrQnVpbGRPdXRwdXRdLFxuICAgICAgICBwcm9qZWN0OiBuZXcgUGlwZWxpbmVQcm9qZWN0KHRoaXMsICdDZGtCdWlsZFByb2plY3QnLHtcbiAgICAgICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICAgICAgYnVpbGRJbWFnZTogTGludXhCdWlsZEltYWdlLlNUQU5EQVJEXzVfMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgYnVpbGRTcGVjOiBCdWlsZFNwZWMuZnJvbVNvdXJjZUZpbGVuYW1lKCdidWlsZC1zcGVjL2Nkay1idWlsZC1zcGVjLnltbCcpXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIF1cbiAgIH0pXG5cbiAgfVxufVxuIl19