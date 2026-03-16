<template>
    <div>
        <ActiviteeListeElement v-for="activitee in props.activitees" :activity="activitee" @select="emit('select', activitee)" />
    </div>
</template>
<script setup lang="ts">
import { StravaActivitee } from '@/model/StravaActivitee';
import ActiviteeListeElement from './ActiviteeListeElement.vue';

    const props = defineProps<{activitees: StravaActivitee[]}>();

    const emit = defineEmits<{
        select: [activity: StravaActivitee];
    }>();

</script>
