  <!-- Clock settings modal form-->

<template>
  <b-modal
    id="clock-settings"
    size="md"
    title="Clock settings"
    ok-only
    @ok="onFormOk"
    @close="onFormCancel"
  >
    <b-form>
      <div class="form-row inline-form">
        <b-form-group
          id="input-group-1"
          label="Mode"
          label-for="mode-select"
          label-cols="4"
          class="font-weight-bold shadow-lg"
        >
          <b-form-select id="mode-select" v-model="form.mode" :options="modes" cols="6"></b-form-select>
        </b-form-group>
      </div>
      <div class="form-row text-center">
        <div class="font-weight-bold">Main time limit</div>
      </div>
      <div class="form-row">
        <div class="col col-4 text-center">
          <label for="maintime-h">Hours</label>
        </div>
        <div class="col col-4 text-center">
          <label for="maintime-m">Minutes</label>
        </div>
        <div class="col col-4 text-center">
          <label for="maintime-s">Seconds</label>
        </div>
      </div>
      <div class="form-row">
        <div class="col col-4">
          <b-form-spinbutton id="maintime-h" v-model="form.maintime.h" min="0" max="6"></b-form-spinbutton>
        </div>

        <div class="col col-4">
          <b-form-spinbutton id="maintime-m" v-model="form.maintime.m" min="0" max="60"></b-form-spinbutton>
        </div>
        <div class="col col-4">
          <b-form-spinbutton id="maintime-s" v-model="form.maintime.s" min="0" max="60"></b-form-spinbutton>
        </div>
      </div>
      <div class="form-row" v-if="this.form.mode !== 'standard'">
        <b-form-group
          id="input-group-3"
          :label="extratime_label"
          class="shadow-lg font-weight-bold"
        >
          <b-form-spinbutton id="extratime" v-model="form.extratime" min="0" max="60"></b-form-spinbutton>
        </b-form-group>
      </div>
    </b-form>

    <h3
      class="my-3 mx-auto bg-info"
      style="width: auto; text-align:center"
    >{{settingsSummary(form.mode, maintime, form.extratime)}}</h3>
  </b-modal>
</template>

<script>
export default {
    
}
</script>