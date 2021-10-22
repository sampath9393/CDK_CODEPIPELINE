import * as cdk from '@aws-cdk/core';
import { Stage } from '@aws-cdk/core';
import { EksvpcStack } from "./eks_vpc-stack"

export class ekstriggerdeploy extends Stage {

 
  constructor(scope: cdk.Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);

    const eks = new EksvpcStack(this, 'EksvpcStack');

    
  }
}