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
          &quot;Blather &apos;Round&quot; is a trademark of Jackbox Games. This
          website is not affiliated with, sponsored, endorsed, or approved by
          Jackbox Games.
        </p>
      </div>
      <div className="flex-initial w-36 text-right">
        <div className="text-left">
          <Link href="https://github.com/theusaf/blather-round-modder" className="block">
            <FontAwesomeIcon
              icon="github"
              type="brands"
            ></FontAwesomeIcon>
            GitHub
          </Link>
          <Link href="https://theusaf.org" className="block">
            <FontAwesomeIcon icon="house"></FontAwesomeIcon>theusaf.org
          </Link>
        </div>
      </div>
    </div>
  );
}
