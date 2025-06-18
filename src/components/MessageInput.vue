<template>
    <div class="message-input w-full shadow-sm border rounded-lg border-gray-300 py-1 px-2 focus-within:border-green-700">
        <!-- <div>

        </div> -->
        <div class="flex items-center space-x-3">
            <!-- <input type="file"  accept="image/*" ref="fileInput" class="hidden" @change="handleImageUpload">
            <Icon 
                icon="radix-icons:image" 
                width="24" 
                height="24" 
                :class="[
                'mr-2',
                disabled ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 cursor-pointer hover:text-gray-600'
                ]"
                @click="triggerFileInput"
            /> -->
            <input class="outline-none border-0 flex-1 bg-white focus:ring-0" type="text">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Send</button>
        </div>
    </div>
    
</template>

<script setup lang="ts">

</script>