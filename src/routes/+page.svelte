<script>
    import { onMount } from 'svelte';
    import AIPasteButton from './AIPasteButton.svelte';

    // 入力フォームにバインドされるJSONオブジェクト
    let userInfo = {
        name: '',
        email: '',
        phone: '',
        address: '',
        hobby: '',
    }


    // テストとしては利用しないメソッド
    async function handleSubmit() {

        const response = await fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        });

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }

        const data = await response.json();
        console.log(data.message);
    }
</script>

<h1 class="nordic-title">User Registration Application</h1>
<p class="nordic-paragraph">It's AIPasteButton Test Site</p>

<form on:submit|preventDefault={handleSubmit} class="nordic-form">
    <label for="name" class="nordic-label">Name</label>
    <input type="text" id="name" bind:value={userInfo.name} class="nordic-input" />

    <label for="email" class="nordic-label">Email</label>
    <input type="email" id="email" bind:value={userInfo.email} class="nordic-input" />

    <label for="phone" class="nordic-label">Phone</label>
    <input type="tel" id="phone" bind:value={userInfo.phone} class="nordic-input" />

    <label for="address" class="nordic-label">Address</label>
    <input type="text" id="address" bind:value={userInfo.address} class="nordic-input" />

    <label for="hobby" class="nordic-label">Hobby</label>
    <input type="text" id="hobby" bind:value={userInfo.hobby} class="nordic-input" />

    <button type="submit" class="nordic-button">Submit</button>

    <AIPasteButton bind:bindObject={userInfo} />
</form>

<style>
    .nordic-title {
    color: #333;
    text-align: center;
    margin-bottom: 20px;
    }

    .nordic-paragraph {
        font-size: 18px;
        color: #666;
        text-align: center;
        margin-bottom: 40px;
    }

    .nordic-form {
        display: flex;
        flex-direction: column;
        max-width: 600px;
        margin: auto;
    }
    
    .nordic-label {
        margin-bottom: 5px;
        font-size: 16px;
        color: #333;
    }
    
    .nordic-input {
        margin-bottom: 20px;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    
    .nordic-button {
        padding: 10px 20px;
        font-size: 16px;
        color: #fff;
        background-color: #3b82f6;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-bottom: 5px;
    }
</style>