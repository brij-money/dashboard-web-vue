<script setup>
defineOptions({name: 'brij-logo-component'});
defineProps({dark: Boolean});
</script>

<template>
  <svg
    class="brij-logo-component"
    width="254"
    height="149"
    viewBox="0 0 254 149"
  >
    <path
      class="brij-logo-component__path brij-logo-component__path--primary"
      d="M20 37C20 42.5228 15.5228 47 10 47C4.47715 47 0 42.5228 0 37C0 31.4772 4.47715 27 10 27C15.5228 27 20 31.4772 20 37Z M20 79C20 84.5228 15.5228 89 10 89C4.47715 89 0 84.5228 0 79C0 73.4772 4.47715 69 10 69C15.5228 69 20 73.4772 20 79Z"
    />
    <path
      class="brij-logo-component__path"
      :class="{
        'brij-logo-component__path--dark': dark,
        'brij-logo-component__path--light': !dark,
      }"
      d="M35 74.5V4C35 1.79086 36.7909 0 39 0H55C57.2091 0 59 1.79086 59 4V36.5418C64.4555 33.9501 70.5584 32.5 77 32.5C100.196 32.5 119 51.304 119 74.5C119 97.696 100.196 116.5 77 116.5C53.804 116.5 35 97.696 35 74.5ZM59 74.5C59 84.4411 67.0589 92.5 77 92.5C86.9411 92.5 95 84.4411 95 74.5C95 64.5589 86.9411 56.5 77 56.5C67.0589 56.5 59 64.5589 59 74.5Z M166 58C159.925 58 155 62.9249 155 69V112C155 114.209 153.209 116 151 116H135C132.791 116 131 114.209 131 112V69C131 49.67 146.67 34 166 34H169C171.209 34 173 35.7909 173 38V54C173 56.2091 171.209 58 169 58H166Z M190 116C187.791 116 186 114.209 186 112V37C186 34.7909 187.791 33 190 33H206C208.209 33 210 34.7909 210 37V112C210 114.209 208.209 116 206 116H190Z M210 12C210 18.6274 204.627 24 198 24C191.373 24 186 18.6274 186 12C186 5.37258 191.373 0 198 0C204.627 0 210 5.37258 210 12Z M230 112V37C230 34.7909 231.791 33 234 33H250C252.209 33 254 34.7909 254 37V112C254 132.435 237.435 149 217 149H216C213.791 149 212 147.209 212 145V129C212 126.791 213.791 125 216 125H217C224.18 125 230 119.18 230 112Z M254 12C254 18.6274 248.627 24 242 24C235.373 24 230 18.6274 230 12C230 5.37258 235.373 0 242 0C248.627 0 254 5.37258 254 12Z"
    />
  </svg>
</template>

<style>
.brij-logo-component {
  display: inline-block;
  fill: none;
  vertical-align: bottom;
}

.brij-logo-component__path {
  clip-rule: evenodd;
  fill-rule: evenodd;
}

.brij-logo-component__path--primary {
  fill: var(--color-primary);
}

.brij-logo-component__path--light {
  fill: var(--color-surface);
}

.brij-logo-component__path--dark {
  fill: var(--color-dark);
}
</style>
