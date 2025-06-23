<template>
  <div class="flex items-center justify-between h-screen">
    <dev class="w-[250px] bg-gray-100 h-full border-r border-gray-300">
      <div class="h-[92%] overflow-y-auto">

      </div>
      <div class="h-[8%] grid grid-cols-2 gap-1 p-1">
        <RouterLink to="/">
          <Button icon-name="radix-icons:chat-bubble" class="w-full">
            {{ t('common.newChat') }}
          </Button>
        </RouterLink>
        <RouterLink to="/settings">
          <Button icon-name="radix-icons:gear" plain class="w-full">
              {{ t('common.settings') }}
          </Button>
        </RouterLink>
      </div>
    </dev>
    <div class="h-full flex-1">
      <RouterView></RouterView>
       <!-- conversion -->
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, computed} from 'vue'
import { useRouter, RouterView, RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

import Button from '@/renderer/components/Button.vue'

import { initProviders } from '@/renderer/db'
import { initI18n } from '@/renderer/i18n'
import { useConversationStore } from '@/renderer/stores/conversation'
import { useProviderStore} from  '@/renderer/stores/provider'







const router = useRouter()
const {t} = useI18n()

const conversationStore = useConversationStore()
const providerStore = useProviderStore()
const items = computed(() => conversationStore.items)


onMounted(async () => {
    await initI18n()
    await initProviders()
    // conversations.value = await db.conversations.toArray()
    // conversationStore.items = await db.conversations.toArray()
    conversationStore.fetchConversations()
    providerStore.fetchProviders()
})

</script>
