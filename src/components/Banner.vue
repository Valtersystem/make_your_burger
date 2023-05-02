<template>
<div id="main-banner">
    <h1>Make your Burger</h1>
</div>
</template>
<script>
export default {
    name: "Bannner"
    
}
</script>

<style scoped>
#main-banner{
    background-image: url("/public/img/burger.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    }

#main-banner h1 {
    color: #fff;
    text-align: center;
    font-size:  60px;
    background-color: #222;
    padding: 20px 40px;
}

@media (max-width: 480px){
    #main-banner h1{
        font-size: 2em;
        margin-top: 80%;
    }
}

</style>