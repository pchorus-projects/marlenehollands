<template>
  <Layout>
    <div class="u-max-page-width">
      <h1 class="heading heading--xxl heading--xxl-paragraph u-margin-top-xl">Kontakt</h1>

      <h2 class="heading heading--xl heading--xl-paragraph">Anschrift</h2>
      <p class="u-font-m u-margin-bottom-xl">
        Marlene Hollands<br />
        Paulusstraße 30<br />
        52134 Herzogenrath<br />
        Telefon: <a href="tel:+49240718794">02407 18794</a><br />
        Email: <a href="mailto:marlene@4xhollands.de">marlene@4xhollands.de</a>
      </p>

      <h2 class="heading heading--xl heading--xl-paragraph">Kontaktformular</h2>

      <p class="u-font-m u-margin-bottom-xl">
        Wenn Sie mit mir in Kontakt treten möchten, nutzen Sie bitte das Kontaktformular oder senden Sie mir eine E-Mail
        an <a href="mailto:marlene@4xhollands.de">marlene@4xhollands.de</a>.
      </p>

      <form
        name="kontakt"
        method="POST"
        action="/nachricht-gesendet/"
        @submit="onSubmit"
        novalidate
        data-netlify
        data-netlify-honeypot="bot-field"
      >
        <input name="bot-field" hidden readonly />
        <input name="form-name" value="kontakt" hidden readonly />

        <div class="form-element">
          <label for="email" class="form-element__label">Ihre Email-Adresse</label>
          <input id="email" name="email" class="form-element__input" required />
          <p class="form-element__error">Bitte geben Sie Ihre Email-Adresse ein.</p>
        </div>

        <div class="form-element">
          <label for="message" class="form-element__label">Ihre Nachricht</label>
          <textarea id="message" name="message" class="form-element__input" rows="8" required></textarea>
          <p class="form-element__error">Bitte geben Sie eine Nachricht ein.</p>
        </div>

        <button class="button button--primary u-margin-bottom-xl" type="submit">Senden</button>
      </form>
    </div>
  </Layout>
</template>

<script>
import { getMetaInfo } from '../utils';

export default {
  metaInfo: getMetaInfo('Kontakt', 'Kontakt'),
  methods: {
    onSubmit(event) {
      const isValid = event.target.checkValidity();
      event.target.classList.add('submitted');

      if (!isValid) {
        event.preventDefault();
      }
    },
  },
};
</script>
