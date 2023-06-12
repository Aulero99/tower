<template>
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel">New Event</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <form @submit.prevent="createNewEvent()">
            <div class="modal-body">
                <div class="form-floating mb-3">
                    <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Event Name"
                    v-model="editable.name"
                    maxlength="50"
                    minlength="2"
                    required>
                    <label for="floatingInput">Event Name</label>
                </div>

                <div class="form-floating mb-3">
                    <textarea 
                    type="text" 
                    class="form-control" 
                    placeholder="Event Details"
                    v-model="editable.description"
                    maxlength="1500"
                    minlength="3"
                    required>
                    </textarea>
                    <label for="floatingInput">Event Description</label>
                </div>

                <div class="form-floating mb-3">
                    <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Event Image"
                    v-model="editable.coverImg"
                    maxlength="500">
                    <label for="floatingInput">Event Image</label>
                </div>

                <div class="form-floating mb-3">
                    <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Event Location"
                    v-model="editable.location"
                    maxlength="100"
                    minlength="2"
                    required>
                    <label for="floatingInput">Event Location</label>
                </div>

                <div class="form-floating mb-3">
                    <input 
                    type="number" 
                    class="form-control" 
                    placeholder="Event Capacity"
                    v-model="editable.capacity" 
                    min="1" 
                    max="200000"
                    required>
                    <label for="floatingInput">Event Capacity</label>
                </div>

                <div class="form-floating mb-3">
                    <input 
                    type="date" 
                    class="form-control" 
                    placeholder="Event Date"
                    v-model="editable.startDate"
                    required>
                    <label for="floatingInput">Event Date</label>
                </div>

                <div>
                    <select 
                    name="category" 
                    v-model="editable.type"
                    required>
                        <option value="concert">Concert</option>
                        <option value="convention">Convention</option>
                        <option value="sport">Sport</option>
                        <option value="digital">Digital</option>
                    </select>
                    <label for="floatingInput">Event Catagory</label>
                </div>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-primary">Create Event</button>
            </div>
            </form>
        </div>
</template>



<script>
import { ref } from 'vue';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { useRouter } from 'vue-router';
import { towerEventsService } from '../services/TowerEventsService.js';
import { Offcanvas } from 'bootstrap';
export default {
    setup() {
        const editable = ref({})
        const router = useRouter()
        return {
            editable,
            async createNewEvent() {
                try {
                    const formData = editable.value
                    const newEvent = await towerEventsService.newEvent(formData)
                    editable.value = {}
                    Offcanvas.getOrCreateInstance('#newEvent').hide()
                    router.push({ name: 'Event', params: { id: newEvent.id } })
                } catch (error) {
                    logger.error(error)
                    Pop.error(error, '[CreateEventForm: createNewEvent()]')
                    logger.log(error)
                }
            }
        };
    },
};
</script>

<style></style>