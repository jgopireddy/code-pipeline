import { Construct } from 'constructs';
import { aws_apigatewayv2, CfnParameter, Stack, StackProps } from 'aws-cdk-lib';
import { CfnParametersCode, Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import { HttpApi } from '@aws-cdk/aws-apigatewayv2-alpha';

export class ServiceStack extends Stack{

    public readonly serviceCode: CfnParametersCode;

    constructor(scope: Construct, id: string, props?: StackProps){
        super(scope, id, props);

        this.serviceCode = Code.fromCfnParameters();

       const lambda = new Function(this, 'ServiceLambda', {
            runtime: Runtime.NODEJS_14_X,
            handler: 'src/lambda.handler',
            code: this.serviceCode,
            functionName: 'ServiceLambda'
        })


        new  HttpApi(this, 'ServiceApi', {
            defaultIntegration: new HttpLambdaIntegration('LambdaIntegration', lambda),
            apiName: 'MyService'
        });
    }
}