import { ServiceStack } from './../lib/service-stack';
import { BillingStack } from './../lib/billing-stack';

import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PipelineStack } from '../lib/pipeline-stack';

const app = new cdk.App();
const pipeline = new PipelineStack(app, 'PipelineStack', {});

const billingStack = new BillingStack(app, 'BillingStack', {
  budgetAmount:1,
  emailAddress:'jagjeevanreddyg@gmail.com'
})

const serviceStack = new ServiceStack(app, 'ServiceStackProd', {});
const prodStage = pipeline.addServiceStage(serviceStack, 'Prod');

pipeline.addBillingStackToStage(billingStack, prodStage);