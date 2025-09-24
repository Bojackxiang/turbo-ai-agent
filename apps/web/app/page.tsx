"use client";

import Image, { type ImageProps } from "next/image";
import { Button, cn } from "@repo/ui";
import styles from "./page.module.css";
import { add } from "@repo/math/add";
import { api } from "../../../packages/backend/convex/_generated/api";
import { useQuery } from "convex/react";
import { Providers } from "./components/providers";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;
  const users = useQuery(api.user.getMany);
  console.log("users: ", users);

  return (
    <div className="flex flex-col items-center justify-center w-full p-4">
      <div className="w-full max-w-2xl mx-auto text-center">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Convex Data:
        </h3>
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <pre className="text-sm text-gray-800 whitespace-pre-wrap break-words text-left">
            {JSON.stringify(users, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <Providers>
      <div className={styles.page}>
        <main className={styles.main}>
          {add(1, 2)}
          <ThemeImage
            className={styles.logo}
            srcLight="turborepo-dark.svg"
            srcDark="turborepo-light.svg"
            alt="Turborepo logo"
            width={180}
            height={38}
            priority
          />
          <ol>
            <li>
              Get started by editing <code>apps/web/app/page.tsx</code>
            </li>
            <li>Save and see your changes instantly.</li>
          </ol>

          <div className={styles.ctas}>
            <a
              className={styles.primary}
              href="https://vercel.com/new/clone?demo-description=Learn+to+implement+a+monorepo+with+a+two+Next.js+sites+that+has+installed+three+local+packages.&demo-image=%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F4K8ZISWAzJ8X1504ca0zmC%2F0b21a1c6246add355e55816278ef54bc%2FBasic.png&demo-title=Monorepo+with+Turborepo&demo-url=https%3A%2F%2Fexamples-basic-web.vercel.sh%2F&from=templates&project-name=Monorepo+with+Turborepo&repository-name=monorepo-turborepo&repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fturborepo%2Ftree%2Fmain%2Fexamples%2Fbasic&root-directory=apps%2Fdocs&skippable-integrations=1&teamSlug=vercel&utm_source=create-turbo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className={styles.logo}
                src="/vercel.svg"
                alt="Vercel logomark"
                width={20}
                height={20}
              />
              Deploy now
            </a>
            <a
              href="https://turborepo.com/docs?utm_source"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondary}
            >
              Read our docs
            </a>
          </div>
          <Button variant="outline" className={cn(styles.secondary)}>
            Open alert
          </Button>
        </main>
        <footer className={styles.footer}>
          <a
            href="https://vercel.com/templates?search=turborepo&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </a>
          <a
            href="https://turborepo.com?utm_source=create-turbo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to turborepo.com →
          </a>
        </footer>
      </div>
    </Providers>
  );
}
