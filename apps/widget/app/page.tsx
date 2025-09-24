"use client";

import styles from "./page.module.css";
import { api } from "../../../packages/backend/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Button } from "@repo/ui";

export default function Home() {
  const users = useQuery(api.user.getMany);
  const addUser = useMutation(api.user.create);

  const onAddClicked = () => {
    addUser({ name: "new test - 4" });
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Button onClick={onAddClicked}> add user</Button>
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
      </main>
    </div>
  );
}
