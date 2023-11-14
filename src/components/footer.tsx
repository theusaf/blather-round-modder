import Link from "next/link";
import React from "react";
import FontAwesomeIcon from "./fontawesome";

export default function Footer() {
  return (
    <div
      className="flex flex-row p-6 bg-cyan-600 text-white"
      style={{
        minHeight: "6rem",
      }}
    >
      <div className="flex-1">
        <p>© Copyright 2023 theusaf.</p>
        <p>
          &ldquo;Blather &rsquo;Round&rdquo; is a trademark of{" "}
          <Link href="https://jackboxgames.com">Jackbox Games</Link>. This
          application is not affiliated with, sponsored, endorsed, or in any way
          officially connected with Jackbox Games.
        </p>
      </div>
      <div className="flex-initial w-36 text-right ml-4">
        <div className="text-left">
          <Link
            href="https://github.com/theusaf/blather-round-modder"
            className="block"
          >
            <FontAwesomeIcon icon="github" type="brands"></FontAwesomeIcon>
            GitHub
          </Link>
          <Link href="https://theusaf.org" className="block">
            <FontAwesomeIcon icon="house"></FontAwesomeIcon>theusaf.org
          </Link>
          <Link href="/privacy" className="block">
            <FontAwesomeIcon icon="link"></FontAwesomeIcon>Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
