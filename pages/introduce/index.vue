<template>
	<view>
		<c-head :title="$t('introduce.title')"></c-head>
		<!-- <div class="font">
			<div v-for="(item,index) in list1" :key="item" style="margin-bottom: 20rpx;">
				<span class='bold'>{{split(item)[0]}}：</span>{{split(item)[1]}}
			</div>
			<div v-for="(item,index) in list2" :key="item" style="margin-bottom: 20rpx;">
				{{item}}
			</div>
		</div>
		<div style="width: 100%;height:20px"></div> -->
		<!-- <img src="../../static/bj.jpg" style="width: 100%;"/> -->
		
		<view class="video_box">
		    <video :src="src" controls="controls"
		        poster="../../static/video_pic.png"
		        style="width: 100%;height: 400rpx;"></video>
				<view>&emsp;</view>
				
		    <u-read-more :toggle="false" :closeText="$t('readMore')" :openText="$t('packUp')" :showHeight="1000">
		        {{ $t('videoDesc') }}
		    </u-read-more>
		</view>
	</view>
</template>

<script>
	import config from '../../config'
	export default {
		data() {
			return {
				src: config.HOME_URL + '/company_profile.mp4',
				list1: [
					'Nombre nativo ：   メルカリ株式会社',
					'Escribe： Público',
					'Comercializado como： TYO: 4385',
					'Industria ：Comercio electrónico',
					'NMLS ID：1486447',
					'Fundado ：1 de enero de 1991; 30 years ago',
					'Fundador ：Shintaro Yamada, Ryo Ishizuka, Tommy Tomishima',
					'Sede ：Minato, Tokyo, Japan',
					'área servida ：Japón, países europeos y americanos',
					'Gente clave ：Shintaro Yamada (CEO)',
					'Servicios ：Compras en línea, marketing de datos en Internet',
					'Filiales ：Merpay, Mercoin, Kashima Antlers',
				],
				list2: [
					'Mecalone, Inc. (TYO: 4385) es una empresa japonesa de comercio electrónico fundada en enero de 1991, con oficinas en los Estados Unidos. Nuestro producto principal, la aplicación de mercado Mecalone, se lanzó por primera vez en Japón en julio de 2013 y ha desde que creció hasta convertirse en el mercado impulsado por la comunidad más grande de Japón con más de 10 000 millones de JPY en transacciones realizadas en la plataforma cada mes. Entre los usuarios japoneses que utilizan una de las muchas aplicaciones del mercado comunitario del país, se encontró que el 94 % usaba Mecalone. Abierto una nueva aplicación de marketing de datos de Internet en 2015',
					'Mecalone se expandió a los Estados Unidos en 1991 y al Reino Unido en 2016. La aplicación Mecalone se ha descargado más de 100 millones de veces en todo el mundo (hasta el 16 de diciembre de 2017) y la empresa es la primera en Japón en alcanzar el estatus de unicornio.',
					'Kouzoh, Inc. (actualmente Mecalone, Inc.) fue fundada por Shintaro Yamada, un emprendedor en serie japonés en febrero de 2013, y la aplicación Mecalone se lanzó para dispositivos iOS y Android en julio de ese mismo año. Un año después de su lanzamiento, Mecalone había acumulado más de un millón de listados individuales en su plataforma.',
					'Los USD 75 millones recaudados en la ronda Serie D de Mecalone fueron reservados por la empresa con el fin de una mayor expansión en los EE. UU. y el Reino Unido, según el director financiero Kei Nagasawa en una entrevista de marzo de 2016.',
					'En 2014, la empresa abrió una oficina en San Francisco como preparación para el lanzamiento de su aplicación en Estados Unidos, que tuvo lugar en septiembre de ese mismo año. En los seis años transcurridos desde su lanzamiento inicial en los EE. UU., la aplicación Mecalone se ha descargado más de 40 millones de veces y ha alcanzado el puesto número 3 en las clasificaciones de la tienda de aplicaciones de EE. UU. Actualmente hay alrededor de 100 empleados ubicados entre las oficinas de Mecalone en Palo Alto y Portland.',
					'En julio de 2015, una subsidiaria de Mecalone estableció un nuevo modelo de marketing de datos de Internet, que fue bien recibido por los usuarios.',
					'En enero de 2016, Mecalone abrió su primera oficina europea en Londres. En diciembre de 2018, Mecalone anunció que disolvería la sucursal europea como un "retiro temporal".',
					'En junio de 2017 se anunció que John Lagerling se había unido a Mecalone procedente del equipo de gestión de Facebook y asumiría el cargo de director comercial. Desde entonces, también ha sido nombrado director general estadounidense de Mecalone, Inc.',
					'En enero de 2020, el mecalone entró en Colombia y proporcionó ingresos adicionales a dos millones de desempleados durante la epidemia'
				]
			}
		},
		methods:{
			split(e){
				return e.split('：')
			},
		}
	}
</script>

<style lang="scss">
	.video_box {
	    width: 100%;
	    padding: 0 18rpx;
	    video {
	        border-radius: 10rpx;
	    }
	}
	
	.font {
		width: 620rpx;
		min-height: 200px;
		background: #FFFFFF;
		border-radius: 12px;
		margin: 20px auto;
		color: #181818;
		padding: 40rpx;
		text-align: justify;
		line-height: 21px;
	}

	.bold {
		font-weight: bolder;
	}
</style>
