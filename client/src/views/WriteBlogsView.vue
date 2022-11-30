<template>
  <section class="py-[50px] px-[120px] w-full flex flex-col gap-5">
    <form @submit.prevent="handleSub">
        <div>
            <label class="" for="title">
                Article Title:
            </label>
            <input v-model="title" class="border-b-2 border-black-100/20 w-full my-3 focus:outline-none focus:border-violet-300 transition duration-200" type="text" name="title" id="title">
        </div>
        <!-- <div>
            <label class="" for="title">
                Article Short Brief:
            </label>
            <input v-model="brief" class="border-b-2 border-black-100/20 w-full my-3 focus:outline-none focus:border-violet-300 transition duration-200" type="text" name="brief" id="brief">
        </div> -->
        <ckeditor :editor="editor" v-model="content" :config="editorConfig"></ckeditor>
        
        <button class="p-5 bg-blue-500">submit</button>
    </form>
    <button @click="VIEW">vieww</button>
  </section>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ref } from 'vue';
import axios from 'axios'

export default {
    name: 'app',
    setup(){
        const editor = ref(ClassicEditor)
        const content = ref('')
        const title = ref('')
        const brief = ref('')

        console.log(content);

        axios.defaults.withCredentials = true;
        const config = {
        headers: {
        "Content-Type": "application/json"
        },
        withCredentials: true
        }

        const VIEW = () => {
             axios('http://localhost:3000/').then(res => {
                console.log("🚀 ~ file: WriteBlogsView.vue:43 ~ axios ~ res", res)
            })
        }

        const option = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ content, title }),
            credentials: "include",
            WithCredentials: true,
        }

        axios.defaults.withCredentials = true;
        
        const handleSub = async () => {
            try {await axios.post('http://localhost:3000/post', {content: content.value, title: title.value}, config).then(response => {
                console.log(response);
            }) 
        } catch(err) {
            console.log(err);
        }
        }
        

        const handleSubmit = async () => {
            try {
            const res = await fetch('http://localhost:3000/post', 
            { 
                method: 'POST', mode: 'no-cors', credentials: 'include', headers: 
                {
                "Accept": "application/json, text/plain, */*"
                }, body: JSON.stringify({ content: content.value, title: title.value }),
            } )

                const data = await res.json()
                if(res.status = 200) {
                    console.log('successfully uploaded a post ', data);
                } else {
                    throw new Error('something went wrong')
                }
            } catch(err) {
                console.log(err.message);
        }
    }





        return {
            editor,
            content,
            title, 
            brief,
            handleSubmit,
            handleSub,
            VIEW
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
    max-width: 750px;
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