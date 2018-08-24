#!/usr/bin/env node

import * as program from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import {promisify} from 'util';

import {XKCD, XKCDResultWithData} from './';

async function init(dir: string = '.'): Promise<[string, XKCD]> {
  const resolvedPath = path.resolve(dir);

  if (await promisify(fs.exists)(resolvedPath)) {
    const xkcd = new XKCD();
    return [resolvedPath, xkcd];
  } else {
    throw new Error(`The specified path does not exist or is not writable.`);
  }
};

async function save(filePath: string, imageResult: XKCDResultWithData) {
  const {data, num, safe_title} = imageResult;

  let extension = data.mimeType ? data.mimeType.replace('image/', '') : 'png';

  const resolvedFilePath = path.resolve(filePath, `xkcd #${num} - ${safe_title}.${extension}`);
  await promisify(fs.writeFile)(resolvedFilePath, data);
  console.error(`Saved image to ${resolvedFilePath}.`);
};

const {
  description,
  name,
  version,
}: {description: string; name: string; version: string} = require('../package.json');

program.on('command:*', () => program.help());

program
  .name(name.replace(/^@[^/]+\//, ''))
  .version(version, '-v, --version')
  .description(description)
  .option('-o, --output <dir>', 'Specify the output directory', path.resolve('.'));

program
  .command('latest')
  .description('Save the latest comic')
  .action(async command => {
    try {
      const [resolvedPath, xkcd] = await init(command.parent.output);
      const imageData = await xkcd.getLatest({withData: true});
      await save(resolvedPath, imageData);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      program.help();
    }
  });

program
  .command('random')
  .description('Save a random comic')
  .action(async command => {
    try {
      const [resolvedPath, xkcd] = await init(command.parent.output);
      const imageData = await xkcd.getRandom({withData: true});
      await save(resolvedPath, imageData);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      program.help();
    }
  });

program
  .command('number <index>')
  .description('Save comic by index number')
  .action(async (index, command) => {
    let parsedIndex: number;
    try {
      parsedIndex = parseInt(index, 10);
    } catch (error) {
      throw new Error('Invalid number specified.');
    }
    const [resolvedPath, xkcd] = await init(command.parent.output);
    const imageData = await xkcd.getByIndex(parsedIndex, {withData: true});
    await save(resolvedPath, imageData);
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
