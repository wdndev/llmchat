<template>
    <div class="provider-select">
        <SelectRoot>
            <SelectTrigger>
                <SelectValue placeholder="Select a model ..."/>
            </SelectTrigger>
            <SelectPortal>
                <SelectContent>
                    <SelectViewport>
                        <SelectItem value="gpt-3.5-turbo"> <SelectItemText>gpt-3.5-turbo</SelectItemText> </SelectItem>
                        <SelectItem value="gpt-4"> <SelectItemText>gpt-4</SelectItemText> </SelectItem>
                        <SelectItem value="gpt-4-32k"> <SelectItemText>gpt-4-32k</SelectItemText></SelectItem>
                    </SelectViewport>
                </SelectContent>
            </SelectPortal>

        </SelectRoot>
    </div>
</template>

<script lang="ts" setup>
    import { Icon } from '@iconify/vue'
    import { ref } from 'vue'
    import {
        SelectContent,
        SelectGroup,
        SelectItem,
        SelectItemIndicator,
        SelectItemText,
        SelectLabel,
        SelectPortal,
        SelectRoot,
        SelectScrollDownButton,
        SelectScrollUpButton,
        SelectSeparator,
        SelectTrigger,
        SelectValue,
        SelectViewport,
    } from 'radix-vue'

</script>
