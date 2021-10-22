#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { codepipelinestack } from '../lib/codepipeline_stack';

const app = new cdk.App();

new codepipelinestack(app, "codepipelinestack");


app.synth();
