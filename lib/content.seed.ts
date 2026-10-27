import type { SiteContent } from './types';

/**
 * Conteúdo "semente" em PT-PT — espelha o mockup aprovado.
 * É usado enquanto o Sanity não estiver ligado, e serve de fallback.
 */
export const seedContent: SiteContent = {
  brand: {
    name: 'Amanda Domingues',
    studio: 'Beauty Studio',
    tagline: 'Mais que beleza, é sobre você.',
    bio: 'Beleza, cuidado e autoestima num só lugar.',
  },
  contact: {
    phoneDisplay: '+351 932 965 698',
    whatsapp: 'https://wa.me/351932965698',
    freshaBooking:
      'https://www.fresha.com/pt/a/amandadominguesbeauty-coimbra-rua-joao-de-deus-ramos-146-d8kru9kb/booking?share=true&pId=3027852&employeeId=5455049&back=%2Fp%2Famanda-domingues-6492286',
    freshaProfile:
      'https://www.fresha.com/pt/p/amanda-domingues-6492286?share=true&pId=3027852',
    instagram: 'https://instagram.com/amandadomingues.beauty',
    instagramHandle: '@amandadomingues.beauty',
    address: {
      line: 'Rua João de Deus Ramos 146',
      area: 'Fonte da Cheira',
      city: 'Coimbra',
      region: 'Coimbra',
      country: 'Portugal',
      postalCode: '3045',
    },
    geo: { lat: 40.1957, lng: -8.4486 },
    hours: 'Atendimento por marcação',
    maps: 'https://www.google.com/maps/search/?api=1&query=Rua+Jo%C3%A3o+de+Deus+Ramos+146+Coimbra',
  },
  stats: { rating: '5,0', appointments: '282', clients: '114', reviews: '8' },
  services: [
    {
      title: 'Manicure',
      benefit: 'Unhas que realçam a sua beleza',
      priceLabel: 'A partir de 12€',
      icon: 'nail',
    },
    {
      title: 'Maquilhagem',
      benefit: 'Beleza em cada detalhe',
      priceLabel: 'Sob consulta',
      icon: 'makeup',
    },
    {
      title: 'Penteado',
      benefit: 'Estilo para todas as ocasiões',
      priceLabel: 'Sob consulta',
      icon: 'hair',
    },
    {
      title: 'Sobrancelhas',
      benefit: 'Harmonia para o seu olhar',
      priceLabel: 'Sob consulta',
      icon: 'brow',
    },
  ],
  prices: [
    {
      group: 'Manicure & Verniz',
      name: 'Manicure comum',
      price: '12€',
      duration: '1h',
    },
    {
      group: 'Manicure & Verniz',
      name: 'Remoção + manicure',
      price: '12€',
      duration: '1h',
    },
    {
      group: 'Manicure & Verniz',
      name: 'Verniz de gel',
      price: 'desde 20€',
      duration: '1h',
    },
    {
      group: 'Manicure & Verniz',
      name: 'Gel na própria unha',
      price: '23,50€',
      duration: '1h30',
    },
    {
      group: 'Alongamentos & Manutenções',
      name: 'Alongamento de unha',
      price: 'desde 35€',
      duration: '1h35',
    },
    {
      group: 'Alongamentos & Manutenções',
      name: 'Manutenção de gel S/M',
      price: 'desde 23,50€',
      duration: '1h30',
    },
    {
      group: 'Alongamentos & Manutenções',
      name: 'Manutenção de gel M/L',
      price: 'desde 26,50€',
      duration: '1h45',
    },
    {
      group: 'Alongamentos & Manutenções',
      name: 'Manutenção L',
      price: 'desde 30€',
      duration: '2h',
    },
    {
      group: 'Pedicure',
      name: 'Pedicure comum',
      price: '21,50€',
      duration: '1h',
    },
    {
      group: 'Pedicure',
      name: 'Pedicure com verniz de gel',
      price: 'desde 25€',
      duration: '1h15',
    },
    {
      group: 'Cabelo & penteado',
      name: 'Penteado — cabelo médio',
      price: 'desde 35€',
      duration: '1h30',
    },
    {
      group: 'Cabelo & penteado',
      name: 'Penteado — cabelo longo',
      price: 'desde 55€',
      duration: '1h40',
    },
    {
      group: 'Maquilhagem · Nail Art · Sobrancelha',
      name: 'Maquilhagem',
      price: 'Sob consulta',
      duration: '',
    },
    {
      group: 'Maquilhagem · Nail Art · Sobrancelha',
      name: 'Nail art',
      price: 'Sob consulta',
      duration: '',
    },
    {
      group: 'Maquilhagem · Nail Art · Sobrancelha',
      name: 'Sobrancelhas',
      price: 'Sob consulta',
      duration: '',
    },
  ],
  about: {
    eyebrow: 'Sobre a Amanda',
    heading: 'Cada cliente é única.',
    pullquote: 'É sobre você — sempre.',
    body: 'Mais do que unhas bonitas ou uma maquilhagem perfeita, o que fica é a sensação de ter sido bem cuidada. É assim que a Amanda trabalha: com calma, carinho e olho no detalhe, do início ao fim.',
  },
  testimonials: [
    {
      quote: 'Super simpática e profissional. O trabalho ficou impecável.',
      author: 'Cliente verificada · Fresha',
    },
    {
      quote: 'Superou as minhas expectativas. Volto de certeza.',
      author: 'Cliente verificada · Fresha',
    },
    {
      quote: 'Atenção e carinho do início ao fim. Recomendo muito.',
      author: 'Cliente verificada · Fresha',
    },
  ],
  gallery: [
    { caption: 'Nail art', icon: 'nail', tone: 'rose' },
    { caption: 'Maquilhagem', icon: 'makeup', tone: 'nude' },
    { caption: 'Penteado', icon: 'hair', tone: 'nude' },
    { caption: 'Sobrancelhas', icon: 'brow', tone: 'rose' },
    { caption: 'Verniz de gel', icon: 'nail', tone: 'nude' },
  ],
  // hero/sobre/galeria vêm do Sanity; sem foto local, o fallback usa o placeholder.
  seo: {
    title:
      'Amanda Domingues Beauty Studio — Manicure, Maquilhagem e Penteados em Coimbra',
    description:
      'Studio de beleza em Fonte da Cheira, Coimbra. Manicure e unhas de gel, maquilhagem, penteados e sobrancelhas, com atenção ao detalhe. Avaliação 5,0 ★. Agende já.',
  },
};
