import React from "react";
import Page from "../Page";
import MarkdownDocument from "../MarkdownDocument";

export default function TermsOfService() {
  return (
    <Page
      title="M4SUB — Умови користування"
      description="Умови користування сервера M4SUB"
    >
      <MarkdownDocument
        src="/terms.md"
        loadingLabel="Завантаження умов..."
        headerIcon="hn-file-text"
        footerText="Користуючись сервісом, ви погоджуєтесь з умовами"
      />
    </Page>
  );
}
