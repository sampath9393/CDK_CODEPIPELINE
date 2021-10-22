import * as cdk from '@aws-cdk/core';
import * as ec2 from "@aws-cdk/aws-ec2";
import * as eks from '@aws-cdk/aws-eks'

import { CfnEC2Fleet, Instance, InstanceType, Subnet, SubnetType, Vpc } from '@aws-cdk/aws-ec2';

interface vpcStackProps extends cdk.StackProps {
    vpc: ec2.Vpc;
}

export class EksclusterStack extends cdk.Stack {


  constructor(scope: cdk.Construct, id: string, props?:vpcStackProps) {
    super(scope, id,props);



    const ekscluster = new eks.Cluster(this, 'HelloEKS', {
        version: eks.KubernetesVersion.V1_21,
        clusterName: 'newEKSCLuster',
        defaultCapacity: 0,
        vpc: props?.vpc
    
      });

      ekscluster.addNodegroupCapacity('capacity',{
          minSize: 3,
          maxSize: 6,
          desiredSize: 3,
          instanceType: new InstanceType('t3.small'),
          nodegroupName: 'MyNodeGroup',
          
          
          

      })






    // The code that defines your stack goes here
  }
}
