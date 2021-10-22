import * as cdk from '@aws-cdk/core';
import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions';
import * as pipelines from '@aws-cdk/pipelines';
import * as codecommit from '@aws-cdk/aws-codecommit';
import { SecretValue } from '@aws-cdk/core';
import { ekstriggerdeploy } from './infra';

export class codepipelinestack extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
      super(scope, id, props);

    const repo = new codecommit.Repository(this, 'repo', {
        repositoryName: "eksvpc"
    });


    const gitArtifact = new codepipeline.Artifact();
    const cdkArtifact = new codepipeline.Artifact();
    

    const pipeline = new pipelines.CdkPipeline(this, 'EksCDKpipeline', {
        pipelineName: 'EksCDKpipeline',
        cloudAssemblyArtifact: cdkArtifact,

        sourceAction: new codepipeline_actions.CodeCommitSourceAction({
            actionName: 'CodeCommit',
            output: gitArtifact, 
            repository: repo,
          
        }),

        synthAction: pipelines.SimpleSynthAction.standardNpmSynth({
          sourceArtifact: gitArtifact,
          cloudAssemblyArtifact: cdkArtifact,
          buildCommand: 'npm run build'
          
        }) 

      });
      
      const deploy = new ekstriggerdeploy(this, 'Deploy');
      pipeline.addApplicationStage(deploy);


    }
}    