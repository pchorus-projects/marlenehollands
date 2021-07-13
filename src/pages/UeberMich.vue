<template>
  <Layout>
    <div class="text">
      <section class="u-max-page-width">
        <h1 class="heading heading--xxl heading--xxl-paragraph">Über mich</h1>
        <div class="text-with-portrait">
          <p class="text-with-portrait__text u-font-m">
            Meine Kenntnisse der Malerei sind autodidaktisch, ich habe Kurse bei hiesigen Künstler/Innen besucht sowie
            Wochenendkurse in der Akademie Klostersteinfeld und der Kunstakademie Heimbach. Um weitere künstlerische
            Erfahrungen, Tipps und neue Techniken zu erfahren und zu erlernen, bilde ich mich in Kursen ständig weiter.
          </p>
          <div>
            <g-image class="portrait" src="@/assets/images/marlenehollands.jpg"></g-image>
          </div>
        </div>
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
    'Meine Kenntnisse der Malerei sind autodidaktisch, ich habe Kurse bei hiesigen Künstler/Innen besucht sowie Wochenendkurse in der Akademie Klostersteinfeld und der Kunstakademie Heimbach.'
  ),
};
</script>

<style lang="scss" scoped>
@import '../assets/variables';

.text-with-portrait {
  display: flex;
  align-items: center;

  &__text {
    margin-right: $space-l;
  }
}

.portrait {
  display: inline-block;
  width: 240px;
  height: 240px;
  object-fit: cover;
  border-radius: $border-radius-default;
}

.text {
  padding-top: $space-xl;
  padding-bottom: $space-xl;

  &--alternate-background {
    background-color: $background-color-alternate;
  }
}

@media (max-width: $max-width-mobile) {
  .text-with-portrait {
    flex-direction: column-reverse;

    &__text {
      margin-top: $space-l;
      margin-right: 0;
    }
  }
}
</style>
