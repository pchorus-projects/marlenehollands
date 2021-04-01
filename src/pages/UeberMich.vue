<template>
  <Layout>
    <div class="text">
      <section class="u-max-page-width">
        <h1 class="heading heading--xxl heading--xxl-paragraph">Über mich</h1>
        <p class="u-font-m">
          Meine Kenntnisse der Malerei, sind autodidaktisch, ich habe Kurse bei hiesigen Künstler/Innen besucht sowie
          Wochenendkurse in der Akademie Klostersteinfeld und der Kunstakademie Heimbach. Um weitere künstlerische
          Erfahrungen, Tipps und neue Techniken zu erfahren und zu erlernen, bilde ich mich in Kursen ständig weiter.
        </p>
      </section>
    </div>

    <div class="text text--alternate-background">
      <section class="u-max-page-width">
        <p class="u-font-m">
          Das Arbeiten mit Farben, ob Aquarell oder Acryl, macht mir unendlich viel Freude, es schult das Sehen und die
          Wahrnehmung. Durch das Experimentieren mit Farben und Hilfsmitteln kann man die Darstellungen als Empfindungen
          wahrnehmen, ob Ruhe, Trauer, Leidenschaft oder Sehnsucht ausstrahlt - es gibt eine Menge zu entdecken. Man
          erfährt und spürt, dass die Farben direkt mit dem Unterbewusstsein korrespondieren. Das Gemalte ist für mich
          wie ein Spiegel des Lebens.
        </p>
      </section>
    </div>
    <div class="text">
      <section class="u-max-page-width">
        <p class="u-font-m">Ja, es ist ein grenzenloses und spannendes Abenteuer!</p>
        <p class="u-font-m">Kunst berührt, überrascht, schenkt Freude und Freunde.</p>
        <p class="u-font-m">Viel Spaß beim Eintauchen in meine bunte Welt.</p>
      </section>
    </div>
  </Layout>
</template>

<script>
import { getMetaInfo } from '../utils';

export default {
  metaInfo: getMetaInfo(
    'Über mich',
    'Hi, mein Name ist Pascal Chorus. Ich bin 35 Jahre alt und seit rund 15 Jahren bin ich als Software-Entwickler tätig. Ich lebe in Herzogenrath in der StädteRegion Aachen und arbeite in Köln.'
  ),
};
</script>

<style lang="scss" scoped>
@import '../assets/variables';

.text {
  padding-top: $space-xl;
  padding-bottom: $space-xl;

  &--alternate-background {
    background-color: $background-color-gray;
  }
}
</style>
