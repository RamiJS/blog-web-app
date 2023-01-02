<template>
  <section class="py-[50px] px-4 lg:px-10 max-w-[700px]">
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-6">
        <div>
            <label class="" for="title">
                Article Title:
            </label>
            <input ref="title" class="border-b-2 border-black-100/20 w-full my-3 focus:outline-none focus:border-violet-300 transition duration-200" type="text" name="title" id="title">
        </div>
        <div>
            <label class="" for="title">
                Article Short Brief:
            </label>
            <input ref="brief" class="border-b-2 border-black-100/20 w-full my-3 focus:outline-none focus:border-violet-300 transition duration-200" type="text" name="brief" id="brief">
        </div>
        <div>
            <label class="" for="imageUpload">
                Article Image:
            </label>
            <input ref="file" type="file" name="imgfile" accept="image/jpeg" id="imgfile" class="border-b-2 border-black-100/20 w-full my-3 focus:outline-none focus:border-violet-300 transition duration-200">
        </div>
        <ckeditor :editor="editor" v-model="content" :config="editorConfig"></ckeditor>
        
        <button class="py-3 px-16 text-lg bg-purple text-white rounded-full self-end">submit</button>
    </form>
  </section>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ref } from 'vue';
import axios from 'axios'
import { useRef } from 'vue';

export default {
    name: 'app',
    setup(){
        const editor = ref(ClassicEditor)
        const content = ref('')
        const title = ref(null)
        const brief = ref(null)
        console.log(content);

        const file = ref(null)

        // axios.defaults.withCredentials = true;
        const config = {
        headers: {
        "Content-Type": "multipart/form-data"
        },
        withCredentials: true
        }

        const handleSubmit = async () => {
            const formData = new FormData();
      
            formData.append('imgfile', file.value.files[0]);
            formData.append('title', title.value.value);
            formData.append('brief', brief.value.value);
            formData.append('content', content.value);

            try {
                await axios.post('http://localhost:3000/post',
                 formData,
                  config).then(response => {
                console.log(response);
                

            }) 
        } catch(err) {
            console.log(err);
            console.log('files:' + file.value );
        }
        }
    
        return {
            editor,
            content,
            title, 
            brief,
            handleSubmit,
            file
        }

        },
    data() {
        return {
            editor: ClassicEditor,
            editorConfig: {
            // The configuration of the editor.
            }
        };
    }
}
</script>

<style>
.ck-editor__editable {
    min-height: 500px;
    max-width: 100%;
    }

.cke_chrome{
    border-radius: 10px !important;
    border: 1px solid #695656 !important;
    border-width: thin !important;        
}

.cke_top{
    border-radius: 10px 10px 0px 0px
}

.cke_bottom{
    border-radius: 0px 0px 10px 10px
}
</style>