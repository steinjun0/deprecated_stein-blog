import Vue from 'vue'
import Quill from 'quill'
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

import ImageResize from 'quill-image-resize-module'
import { ImageDrop } from 'quill-image-drop-module';

Quill.register('modules/imageResize', ImageResize)
Quill.register('modules/imageDrop', ImageDrop);

Vue.use(VueQuillEditor)