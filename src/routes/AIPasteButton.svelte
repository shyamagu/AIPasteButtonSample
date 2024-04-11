<script>

    export let bindObject = {};

    let loading = false;

    const fill = async () => {
        loading = true;
        const text = await navigator.clipboard.readText();

        const keys = Object.keys(bindObject);
        const keysString = keys.join(', '); // Joining the keys with a comma and a space

        const sendData = {
            keys: keysString,
            text: text
        }

        const response = await fetch('/api/callgpt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData)
        });

        const data = await response.json();

        bindObject = JSON.parse(data.jsonStr);

        loading = false;
    }

</script>

<button class:loading_icon={loading} class="paste_button" type="button" on:click={()=>fill()}>AIPaste</button>

<style>
    .paste_button::before {
        font-size: 24px;
        content: "☻";
        padding-right: 5px;
    }

    .loading_icon::before {
        content: "☻";
        font-size: 24px;
        display: inline-block; 
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
    }

    .paste_button {
        padding: 10px 20px;
        font-size: 16px;
        color: #fff;
        background-color: #a9c;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-bottom: 5px;
    }
</style>
