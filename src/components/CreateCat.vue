<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="submit()">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Cat</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="{'md-invalid': getValidationErrors('colorCode').length}">
                <label for="color">Color</label>
                <md-select name="color" id="color" v-model="model.colorCode" md-dense>
                  <md-option></md-option>
                  <md-option v-for="color in COLORS" :key="color.code" :value="color.code">{{ color.name }}</md-option>
                </md-select>
                <span class="md-error" v-for="error in getValidationErrors('colorCode')">{{ error.message }}</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="{'md-invalid': getValidationErrors('words').length}">
                <label for="words">Words</label>
                <md-input name="words" id="words" v-model="model.words" />
                <span class="md-error" v-for="error in getValidationErrors('words')">{{ error.message }}</span>
              </md-field>
            </div>
          </div>
        </md-card-content>

        <md-card-actions>
          <md-button type="button" class="md-raised" @click="goBack()">Cancel</md-button>
          <md-button type="submit" class="md-raised md-primary">Create</md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
  import Ajv from 'ajv';
  import ajvErrors from 'ajv-errors';

  import { COLORS } from '@/constants/commonConstants.js';
  import {
    ADD_CAT
  } from '@/constants/mutationTypes.js';

  export default {
    name: 'CreateCat',
    data: function() {
      return {
        COLORS: COLORS,
        model: {
          latLng: null,
          colorCode: null,
          words: ''
        },
        validate: null,
        errors: []
      };
    },
    created: function() {
      this.model.latLng = JSON.parse(this.$route.query.latLng);
      const ajv = new Ajv({
        allErrors: true,
        jsonPointers: true
      });
      ajvErrors(ajv);
      this.validate = ajv.compile({
        type: 'object',
        properties: {
          colorCode: {
            type: 'integer',
            errorMessage: {
              type: 'The color is required'
            }
          },
          words: {
            type: 'string',
            minLength: 1,
            maxLength: 16,
            errorMessage: {
              minLength: 'The words are required',
              maxLength: 'The words can be at most 16 characters long'
            }
          }
        }
      });
    },
    methods: {
      getValidationErrors: function(fieldName) {
        return this.errors.filter((err) => (err.dataPath === `/${fieldName}`));
      },
      goBack: function() {
        this.$router.go(-1);
      },
      submit: function() {
        if (!this.validate(this.model)) {
          this.errors = this.validate.errors || [];
          return;
        }
        this.$store.commit(ADD_CAT, {
          data: this.model
        });
        this.goBack();
      }
    }
  };
</script>