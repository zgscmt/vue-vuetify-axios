export const navMenu = [{
    search: "search",
    action: 'mdi-cog',
    text: "Form management",
    active: false,
    children: [{
        text: "formType",
        router: "/formType",

    },
    {
        text: "creatForm",
        router: "/creatForm",
        //Form prompt
        prompt: { name: "name", adr: "adress", card: "identity card", gender: { sex: 'gender', gender: ["man", "woman"], }, party_member: { title: 'Whether the party members', isTeam: ['yes', 'no'] }, phone: "phone", type: "type" },
        //set header
        headers: [
            {
                text: "Dessert (100g serving)",
                align: "center",
                value: "name"
            },
            { text: "Calories", value: "calories" },
            { text: "Fat (g)", align: "center", value: "fat" },
            { text: "Carbs (g)", align: "center", value: "carbs" },
            { text: "Protein (g)", align: "center", value: "protein" },
            { text: "Iron (%)", align: "center", value: "iron" }
        ],
        //set button
        btn: "search"

    },
    {
        text: "informData",
        router: "/informData",

    }],
},
{
    action: 'mdi-database',
    text: "The whole stack",
    active: false,
    children: [{
        text: "map",
        router: "/map",

    },
    {
        text: "websites",
        router: "/websites",
        headers: [
            {
                text: "ID",
                align: "center",
                value: "id"
            },
            { text: "site name", value: "name", align: "center", },
            { text: "url", value: "url", align: "center", },
            { text: "alexa", value: "alexa", align: "center", },
            { text: "country", value: "country", align: "center", },
            { text: "operate", value: "operation", align: "center", }
        ],
        prompt: { add: 'The new data', info: 'Details of the data', update: 'modify data', data_info: 'details ', data_update: 'update', data_del: 'delete', btn_confirm: 'confirm', btn_cancel: 'cancel', name: 'site name', url: 'url', alexa: 'alexa', country: 'country' }

    },
    {
        text: "upload",
        router: "/upload",
        headers: [
            {
                text: "the front of ID card",
                align: "center",
                value: "img_head"
            },
            { text: "Reverse side of ID card", value: "img_back", align: "center", },
            { text: "operate", value: "operation", align: "center", }
        ],
        prompt: { verified: 'Certified (Recertification)', unverified: 'Unauthenticated (Click Authenticated)', upload: 'upload pictures', update: 'Upload again', btn_confirm: 'confirm', btn_cancel: 'cancel', id_card_font: 'the front of ID card ', id_card_reverse: 'Reverse side of ID card', click: "Click on the upload" }
    }],
}

];
