<template>
    <div>
      <!-- Video nền -->
      <div class="position-fixed top-0 start-0 w-100 h-100 overflow-hidden" style="z-index: -1;">
        <video class="w-100 h-100 object-fit-cover" autoplay loop muted playsinline>
          <source src="../assets/images/video.mp4" type="video/mp4">
        </video>
      </div>
    </div>
</template>
  
<script>
  export default {
    name: "Home",
  };
</script>
  