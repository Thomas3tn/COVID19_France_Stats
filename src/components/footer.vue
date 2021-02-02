<template>
    <footer class="footer">

        <div class="footer__topPageBtnContainer">
            <button class="footer__topPageBtn">Top of Page</button>
        </div>
        <div class="footer__infosContainer">
            <div class="aboutContainer">
                <h2>About</h2>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit quod nobis quo, 
                    delectus possimus obcaecati labore sunt in deserunt inventore et, suscipit earum 
                    sint saepe ducimus, dignissimos aliquam corporis voluptatibus!
                </p>
            </div>

            <div class="quickLinksContainer">
                <h2>Quick Links</h2>
                <ul>
                    <li><a href="#" title="Privacy Policy">Privacy Policy</a></li>
                    <li><a href="#" title="Source Code">Source Code</a></li>
                    <li><a href="#" title="Ministère de la Santé">Ministère de la Santé</a></li>
                </ul>
            </div>
        </div>

    </footer>
</template>

<style lang="scss">
.footer {
	&__topPageBtn {
		width: 100%;
		height: 100%;
		background-color: rgb(30, 30, 30);
		color: white;
		border: none;
		cursor: pointer;
		padding: 0.5rem 0;
		transition: all 300ms;
		&:hover {
			background-color: lighten(rgb(30, 30, 30), 7%);
		}
	}
	&__infosContainer {
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: rgb(30, 30, 30);
		color: white;
		padding: 1rem 4rem;
	}
}

.quickLinksContainer {
	flex: 1;
}
</style>