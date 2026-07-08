import React from "react";
import Page from "../Page";
import MarkdownDocument from "../MarkdownDocument";

export default function PrivacyPolicy() {
  return (
    <Page
      title="M4SUB — Політика конфіденційності"
      description="Політика конфіденційності сервера M4SUB"
    >
      <MarkdownDocument
        src="/privacy.md"
        loadingLabel="Завантаження політики..."
        headerIcon="hn-shield"
        footerText="Ваші дані — наша відповідальність"
      />
    </Page>
  );
}
