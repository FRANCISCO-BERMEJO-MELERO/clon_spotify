<script lang="ts">
    const currentTime = new Date()
    const currentHour = currentTime.getHours()
    const greeting = currentHour < 12 ? 'Buenos días' : currentHour < 18 ? 'Buenas tardes' : 'Buenas noches'
</script>

<div class="text-white text-3xl font-bold">{greeting}</div>