define(function() {
	return {
		types: {
			standard: 0,
			custom: 1,
			customTemplate: 2
		},
		settings: {
			defaultTemplateUrl: '/assets/global/modules/login/carousel/carousel.component.html',
			templateStyle: '.btn {color: red;} .bl--login-carousel {background: red;}'
		},
		items: [
			{
				id: 1,
				type: 0,
				name: 'Item one',
				backgroundColor: '#ffffff',
				backgroundUrl: 'https://scontent-frt3-1.xx.fbcdn.net/v/t31.0-8/15675991_1631647403528915_4392419844877975290_o.jpg?oh=16d6cc85caa0baa74d87690be9148735&oe=58ED0FB4',
				components: {
					title: {
						text: 'Item one',
						style: 'color: blue;',
						cssClass: ''
					},
					description: {
						text: 'Item one description',
						style: 'color: blue;',
						cssClass: ''
					},
					links: [
						{
							text: 'Button one',
							url: 'http://',
							tooltip: 'Button one tooltip',
							style: 'color: blue;',
							cssClass: ''
						},
						{
							text: 'Button two',
							url: 'http://',
							tooltip: 'Button two tooltip',
							style: 'color: blue;',
							cssClass: ''
						}
					],
					text: [],
					link: [],
					data: null,
					template: null
				}
			},
			{
				id: 2,
				type: 1,
				name: 'Item two',
				backgroundColor: '#ffffff',
				backgroundUrl: 'https://scontent-frt3-1.xx.fbcdn.net/v/t31.0-8/15723706_1631664776860511_5682889318137162796_o.jpg?oh=307ce24c2bff53fae1076f3fbd5a6cf6&oe=591A8095',
				components: {
					text: [
						{
							style: 'color: blue;',
							cssClass: '',
							text: 'Text one'
						},
						{
							style: 'color: green;',
							cssClass: '',
							text: 'Text two'
						}
					],
					links: [
						{
							style: 'cursor: pointer;',
							cssClass: '',
							text: 'Button one',
							url: 'http://',
							tooltip: 'Button one tooltip'
						},
						{
							style: 'cursor: pointer;',
							cssClass: '',
							text: 'Button two',
							url: 'http://',
							tooltip: 'Button two tooltip'
						}
					],
					data: null,
					template: null
				}
			},
			{
				id: 3,
				type: 2,
				name: 'Item three',
				backgroundColor: '#ffffff',
				backgroundUrl: 'https://scontent-frt3-1.xx.fbcdn.net/v/t31.0-8/15800143_1645536722139983_5757963023079253099_o.jpg?oh=b38b1da6a212b2f8ec8a91afbbf39b37&oe=58E148F3',
				components: {
					links: [],
					text: [],
					data: {
						title: {
							text: 'Item one',
							style: 'color: blue;',
							cssClass: ''
						},
						description: {
							text: 'Item one description',
							style: 'color: blue;',
							cssClass: ''
						},
						links: [
							{
								text: 'Button one',
								url: 'http://',
								tooltip: 'Button one tooltip',
								style: 'color: blue;',
								cssClass: ''
							},
							{
								text: 'Button two',
								url: 'http://',
								tooltip: 'Button two tooltip',
								style: 'color: blue;',
								cssClass: ''
							}
						]
					},
					template: {
						url: '/assets/global/modules/login/carousel/carousel-slide-custom.html'
					}
				}
			}
		],
		slideshow: {
			autoPlay: true,
			interval: 5000,
			restart: 2000
		}
	};
});
