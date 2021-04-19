<template>
  <Layout>
    <div class="text-block u-max-page-width">
      <h1>Impressum</h1>

      <p>Angaben gemäß § 5 TMG</p>

      <h2>Betreiber der Webseite</h2>
      <p>
        Marlene Hollands<br />
        Paulusstraße 30<br />
        52134 Herzogenrath<br />
        Telefon: <a href="tel:+49240718794">02407 18794</a><br />
        Email: <a href="mailto:marlene@4xhollands.de">marlene@4xhollands.de</a>
      </p>

      <h2>Vertretungs&shy;berechtigt</h2>
      <p>Marlene Hollands</p>

      <h2>Registergericht&shy;eintrag</h2>
      <p>Nicht eingetragen</p>
    </div>
  </Layout>
</template>

<script>
import { getMetaInfo } from '../utils';

export default {
  metaInfo: getMetaInfo('Impressum', 'Impressum für den Internetauftritt von Marlene Hollands.'),
};
</script>
