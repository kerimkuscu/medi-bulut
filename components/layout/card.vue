<template>
  <div class="p-7">
    <div class="card bg-white shadow-lg rounded-lg">
      <div class="card-header text-black text-2xl p-2">
        <slot name="header"></slot>
      </div>
      <hr>
      <div class="card-body">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
};
</script>
