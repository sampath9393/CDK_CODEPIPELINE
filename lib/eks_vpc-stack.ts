import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2'
import { NatProvider } from '@aws-cdk/aws-ec2';
import { EksclusterStack } from './eks_cluster_stack';



export class EksvpcStack extends cdk.Stack {

    public readonly vpc: ec2.Vpc;
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.vpc = new ec2.Vpc(this, 'EKSVPC', {
    
        cidr: "10.0.0.0/16",
        maxAzs: 2,
        enableDnsHostnames: true,
        enableDnsSupport: true,
        natGatewayProvider: NatProvider.gateway(
        ),
        natGateways:2,




        subnetConfiguration: [
            {
                cidrMask: 24,
                name: 'eks-public-1',
                subnetType: ec2.SubnetType.PUBLIC,
            },
            
            {
                cidrMask: 24,
                name: 'eks-private-1',
                subnetType: ec2.SubnetType.PRIVATE_WITH_NAT,
            },
            
        ],

     });

     const EKSCDK = new EksclusterStack(this, 'EksclusterStack', {
        vpc: this.vpc
      });
  }
}