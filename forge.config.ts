import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';
import { FusesPlugin } from '@electron-forge/plugin-fuses';
import { FuseV1Options, FuseVersion } from '@electron/fuses';

import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';
import path from "node:path";

const FLAGS = {
  IS_CODESIGNING_ENABLED: process.env.IS_CODESIGNING_ENABLED !== "false",
  SIGNTOOL_PATH:
    process.env.SIGNTOOL_PATH ||
    path.join(
      __dirname,
      "Microsoft.Windows.SDK.BuildTools/bin/10.0.26100.0/x64/signtool.exe",
    ),
  AZURE_CODE_SIGNING_DLIB:
    process.env.AZURE_CODE_SIGNING_DLIB ||
    path.join(
      __dirname,
      "Microsoft.Trusted.Signing.Client/bin/x64/Azure.CodeSigning.Dlib.dll",
    ),
  AZURE_METADATA_JSON_PATH:
    process.env.AZURE_METADATA_JSON ||
    path.resolve(__dirname, "trusted-signing-metadata.json"),
  AZURE_TENANT_ID: process.env.AZURE_TENANT_ID,
  AZURE_CLIENT_ID: process.env.AZURE_CLIENT_ID,
  AZURE_CLIENT_SECRET: process.env.AZURE_CLIENT_SECRET,
  APPLE_ID: process.env.APPLE_ID || "felix@felixrieseberg.com",
  APPLE_ID_PASSWORD: process.env.APPLE_ID_PASSWORD,
};

const windowsSign: Record<string, unknown> = {
  signToolPath: FLAGS.SIGNTOOL_PATH,
  signWithParams: `/v /dlib ${FLAGS.AZURE_CODE_SIGNING_DLIB} /dmdf ${FLAGS.AZURE_METADATA_JSON_PATH}`,
  timestampServer: "http://timestamp.acs.microsoft.com",
  hashes: ["sha256"],
};

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    appBundleId: "com.felixrieseberg.mim",
    appCategoryType: "public.app-category.productivity",
    win32metadata: {
      CompanyName: "Felix Rieseberg",
      OriginalFilename: "Mark Instant Messenger",
    },
    osxSign: FLAGS.IS_CODESIGNING_ENABLED
      ? {
          identity: "Developer ID Application: Felix Rieseberg (LT94ZKYDCJ)",
        }
      : undefined,
    osxNotarize: FLAGS.IS_CODESIGNING_ENABLED && FLAGS.APPLE_ID_PASSWORD
      ? {
          appleId: FLAGS.APPLE_ID,
          appleIdPassword: FLAGS.APPLE_ID_PASSWORD,
          teamId: "LT94ZKYDCJ",
        }
      : undefined,
    windowsSign: FLAGS.IS_CODESIGNING_ENABLED ? windowsSign : undefined,
    icon: path.resolve(__dirname, "assets/icon"),
    junk: true,
    overwrite: true,
    prune: true,
  },
  rebuildConfig: {},
  makers: [new MakerSquirrel({}), new MakerZIP({}, ['darwin']), new MakerRpm({}), new MakerDeb({})],
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './src/renderer/index.html',
            js: './src/renderer/renderer.tsx',
            name: 'main_window',
            preload: {
              js: './src/main/preload.ts',
            },
          },
        ],
      },
    }),
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};

export default config;
