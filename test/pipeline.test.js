"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("aws-cdk-lib");
// import { Template } from 'aws-cdk-lib/assertions';
const Pipeline = require("../lib/pipeline-stack");
const assertions_1 = require("aws-cdk-lib/assertions");
// example test. To run these tests, uncomment this file along with the
// example resource in lib/pipeline-stack.ts
test('Empty Stack Created', () => {
    const app = new cdk.App();
    //     // WHEN
    const stack = new Pipeline.PipelineStack(app, 'MyTestStack');
    //     // THEN
    const template = assertions_1.Template.fromStack(stack);
    template.resourceCountIs('AWS::SQS::Queue', 0);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmUudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBpcGVsaW5lLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBbUM7QUFDbkMscURBQXFEO0FBQ3JELGtEQUFrRDtBQUNsRCx1REFBeUQ7QUFFekQsdUVBQXVFO0FBQ3ZFLDRDQUE0QztBQUM1QyxJQUFJLENBQUMscUJBQXFCLEVBQUUsR0FBRyxFQUFFO0lBQy9CLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzVCLGNBQWM7SUFDWixNQUFNLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQy9ELGNBQWM7SUFDWixNQUFNLFFBQVEsR0FBRyxxQkFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUUxQyxRQUFRLENBQUMsZUFBZSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2xELENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbi8vIGltcG9ydCB7IFRlbXBsYXRlIH0gZnJvbSAnYXdzLWNkay1saWIvYXNzZXJ0aW9ucyc7XG5pbXBvcnQgKiBhcyBQaXBlbGluZSBmcm9tICcuLi9saWIvcGlwZWxpbmUtc3RhY2snO1xuaW1wb3J0IHtUZW1wbGF0ZSwgQ2FwdHVyZX0gZnJvbSAnYXdzLWNkay1saWIvYXNzZXJ0aW9ucyc7XG5cbi8vIGV4YW1wbGUgdGVzdC4gVG8gcnVuIHRoZXNlIHRlc3RzLCB1bmNvbW1lbnQgdGhpcyBmaWxlIGFsb25nIHdpdGggdGhlXG4vLyBleGFtcGxlIHJlc291cmNlIGluIGxpYi9waXBlbGluZS1zdGFjay50c1xudGVzdCgnRW1wdHkgU3RhY2sgQ3JlYXRlZCcsICgpID0+IHtcbiAgY29uc3QgYXBwID0gbmV3IGNkay5BcHAoKTtcbi8vICAgICAvLyBXSEVOXG4gIGNvbnN0IHN0YWNrID0gbmV3IFBpcGVsaW5lLlBpcGVsaW5lU3RhY2soYXBwLCAnTXlUZXN0U3RhY2snKTtcbi8vICAgICAvLyBUSEVOXG4gIGNvbnN0IHRlbXBsYXRlID0gVGVtcGxhdGUuZnJvbVN0YWNrKHN0YWNrKTtcblxuICAgdGVtcGxhdGUucmVzb3VyY2VDb3VudElzKCdBV1M6OlNRUzo6UXVldWUnLCAwKTtcbn0pO1xuIl19