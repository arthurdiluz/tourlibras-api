import { join } from 'path';

type PathOptions = { directory: string; fileName?: string };

/**
 * Get formatted path
 * @param directory Raw path
 * @param fileName Raw file name (optional)
 * @returns Formatted AWS Key
 */

export default function formatPath({
  directory,
  fileName,
}: PathOptions): string {
  const dirNames = directory
    ? directory.split('/').filter((name) => name !== '')
    : '';
  const fullPath = join(...dirNames);

  return fileName ? join(fullPath, fileName) : fullPath;
}
