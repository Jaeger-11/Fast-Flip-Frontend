import { useState, useEffect } from "react";
import { FlipCard } from "../types/interface";
import Result from "../components/Result";
import { useNavigate } from "react-router-dom";

const items:FlipCard[] = [
    {
        // _id: "664dd3d256ef021216049200",
        name: "Deadpool",
        imageUrl: "https://images.unsplash.com/photo-1501432377862-3d0432b87a14?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "heroes",
        isFlipped: false
    },
    {
        // _id: "664dd52956ef021216049204",
        name: "Spiderman",
        imageUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D",
        category: "heroes",
        isFlipped: false
    },
    {
        // _id: "664dd61e56ef021216049206",
        name: "Batman",
        imageUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUWFRgVFhYZGBgaGhoaGhwYGBgaHB4aGhgcGhgYGhocIS4lHB4rHxoYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QGhISGjEhGCE0NDQ0NDQ0MTQ0NDQ0NDQ0NDQ0NDE0NDQ0MTQ0MTQ0NDQ0NDQ0MTQ0NDQ0NDQ0NDQ0NP/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAEAAECAwUGB//EAD8QAAEDAgMFBgQEBAYBBQAAAAEAAhEDIQQSMUFRYXGBBSKRscHwBhOh0TJCUuEUcpKyB2KCosLxJBUWIzTD/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAZEQEBAQEBAQAAAAAAAAAAAAAAARECITH/2gAMAwEAAhEDEQA/APM499FfTE+BPgL/AElUhwI4p2nmqi7eok2UATe31SawC5v75oLGFF0n6oQOHJXseB/0EF7UbhKe3egHFHdn1LQTyViVrUKQF1qYcaLNYbLQwz1qM1pUkXTQVIopjlpkWwqWcESsntnGmlh6tQGHNYcs/rPdZ/uLUcywjcAPBEwnlAVgPHT3y8kXUKx+3MR8ul8zYx1Mn+V1RrHf7XOSrGd21T7hXKvFzzXbdo05aeq5Z+FknmsdOnIJ8Jm+v2Rf8LsQVYR4/ZZVYwqt4Th2ievAAh2YmSYBAG4Xgk6zaOaASsNvD1Qb2W3WCPddDVhs2DVRQrnjYOCllF3HQHTed3Lfw5hV1Bc+9imTe5sJ81FSL4u7U8Ez3gyoOeDrKg9w2T1Q1P5o3D6pKmUkwaIHiptd6qLDKVVVEmuTFyGfU2brfUm/ikx6AglXsKHaVa06IDwpUZBTUTIRjKcrSD8K4rVwrlkUrLTwjrqxmtmmFewoembKxrlphz/x7iS3Dhg/O/6NBP8AdkXW9lYZ1cNdTLCHNDgc7T3TEGGkkbtNbLzz/EOoc1IbA1x/qIH/AOZQnwx23Uw+b5bsubLnIAl2WzRMSIk6cNyzb63OfHsFX4crATmp/wBRHm1cd/iFg3UMHU+YMpe+mxgkHM7OHmI2BrD4hT/91V3sjO4jnrrqdqw/iTFPxLGMqGWUwcg/TOpk3JsEt8JPWhgKvzMPTfMksAJ3ub3XH+oFVP7P1VXwlJoOYfyVHN6FrX+byt0Msn0+Obo0YJlZXalHvW0XX1cKNVkYvDa2UsWVzJTPEhEvwkTJhBOKy0eLIaszyVgf78E4MwOaKArt70qDxrw9hFYhneVNdoab3JAMbp06/dQUhsCT0Hry80nBIu2nVQcUDZk6ikqDw+CNytebKjd72FTadQoBn6p2ujifonewqstVQSx/vqrg5AtPvqEXh2lwUBuGq++q3MKQQudpUzmC38K2GrUSiyjcM+6z2GyJoPutMt2k+yvabLOpVFo4e4VZcT8b955b+mkD4Oe5clgsTlndH/ILuPiWl/5LnES0YV2bpnPkV50Cs1ufHY9k9vNYCSA4ERBG3YrMX2uHtIaIB+64xr1tdm4d72EjYCeYbc+vgpq47H4IqZmVuDx9WfsuiqaLmvgFhDK4Oudh6Fro8iuneFqfGb9DNNkFiUcBZc92rinBxDUpAnbNQAZRqudqPR+KeSZOqz6ixa3EWG3vgrWi46+SrYEQ1qiovOiFxLQeisxDoI97VTWf5IAilFuvoFIuSA05+gQQSSSVBLT76FTYbHp5FVKxhsenkVAxcoyk9snwUyyDBQQMrUwjO6gmsWlhtIQTptkjqtam2yHw9EBHsatRiqahICsokwi/lAiCnbQghaRbSlbeG0WfRZEI/DuSJXH/AOINepTeMtm1aeUn+V0OaN1iz+pcFOs34+9V6V/iM9po0qZ/ETUe3fGUAED9LixzeYXnLsMYBF5AIWb9b5+FTy6kGNBGk2m58eoWg3HOJDKRyDQuJiBtNtBG6Sdm5CFjixjAJJe6IvMtYBG+UZiuxX0WF1UEEtBa0EHU5ZcQdh/LryWdxc12/wAANJoVHkzmqZQSIkU2zMcTUPgukfouV/w8q/8AjuBm1V0HZdjTA6yeq6eq+y6T4xfoUuXO9pfiK36hXN9rOupVjLxQQD2rSIzc0PUorDYOnZWh9wllUHHTmgrxLtENUPkr650VLwihiFflhw5D0VTh6q5xuDw9AURVkSV8JIK5hWsEjqPIqL2ackSylaeXqgGyqbWq8MUhTQVtC0cLTi6CDLrTw4sgvpPJK08NuQdBi0MMy61GKLYxXBik0Na3M9wY39Tpj6AlN/FMg5JeRo5mSuzmadOpnA4kdFpBmEwj3glos38TjZreLnGwQHaHxFhsOJDxWf8A5bsnh+rmbKGO+IP4mgcM+kwNpz36B7k3/Gx3epOBAOZ8A94HYTwmJwLiSHNcIuZ7jdBBkiXCIAMAcd81cD9vdr1MVWdWqGXGANzWt/C0RoBfxUKVUZWEG4BaZ2QSfUISuwAxLZ07skeJ2pqTwAQeECAQTvmbeBWa1Gv2JiKbKhe5wa7Royudc2LhFgSLTO9EfEXaWemG5g7v6jQiJnnpPJZOG7VeycsQdQQIPPeqaj31XE20JgWAHDcs57rW+Nf4a+JKmELmgB9N5Bew6HZI4/YQRqu7w3aLMQ0PoknaWH8YvBt+YSDp9dV5bTpF06Dh6cPVG9l4HEOePlNfmGjmzbq3yEk7itysWPSqBlZvbVNpVz+3WhrG1306fy+657nGpiH21cyiHBpJ2PLYAi5uhzh6tZpqU6NdzJgOdSIm2oylwI6q1Iww2/vciG4bMoObDoNiJmbabEXhMQGlc63AOLwDmiSCFlPbpzC7Pt7thlVjGhjGFjcpLGgF2gl0amw+u9cpUHDj4c/uFJVsAVxpKqfrZX4oeM6HXTZOvSUO/ULQoIVzhpy9FWpvqDZuQWpKj5pSQFMaiAVQxysaURbCkGqNM+Cuaio5FcyyQCsDUQfgAXGB1J0C2KfbOGobPmu3/lB9VxnaOPLBkbzd10E7v3Wf/EE8ytS4zZr02p/iUWNinTGn8oHS8rlO0O2v4pxc6jSa6Sc1JmSdvec5977QFiQxv4rnbJB5zs8E1PElzsrIA2uI05Del60kkaJGIc78bTl0LnOc4HcHDbwaVvdl9jY3EAsLKTxGYtc8ttN3AOFn8Sbbt4GGLGd7adpgk8ANAN2kXWhR7acGuDHFhymIMOMbC8X6CBGsqQYvxH8MPw4LjTywJcGuDwBzGo4wFyTwuwwnxMGtFOq1wDZbmADpvfM0wZ4yddFKvjMAGZm5C9veYG03tcXgy0OdlAiYmTp0QceAQbai9oOydi2MJgYbebgEyIg6gTwEePBaWA7fw8tBoNZnn5xyhzYLTJAu4jPldGwAi61cR2xhWRD2f6Gkn6DzRXOfLpsIL2GodQ0S0O5vkHoJRlX4kqkZWUWBumUnOOM02xTdu7zCeJUcX8WOBAoDuXzCo1pDyY2C7IA1a4G5vsVQq0sSZaMlTUt1mNoP5xws4DaQCUDU+2MQHiox+R4GUFjBTgbQMhDW9IU2dsvDw+sG4k7sU6q9vOC8T1JHBZ1WnlcWFxa7ZeWkbCJ2cFQcSRIMEbxfxB096oO/o/FGBrCMTgsj7APwr8o0i7HOAEc3IergKbwX4WqKrdrDaq3mwgOdzygbpXBioNR3TvjXnA+v02qynjXAztGhFj0OxBvVHFUPfCtGK+c0PnvWD9+b9XUCZQ1QW971GlOLNthvt6qks0gxwNx03Iiq3un+ZVPZYIBXMtMEcrj9vqnZTbvlOZA3XUXSdd3qUQ/d3JJsiSKIY3Xor8tgq2C0+/equiyyIM1VzXKpjbwrmsQEMKIA2qhjb+9yftCoG0n7zYdT/wBq6OZqPc9xcd5JJ0ElPTqwbbjc8BPRUyY4T0lJmvQ+S0yTnE6++SPwVr71movCYjLqJadeHEbvX6gOhwbGPIzSeBOngisRhWCXMc4HYDccht81jUMQNQB0+xW1hsWDAMW2HTmd593UVgYvCVXwW03lv6sjjrtsJPRZpEZhuEbdjhvuvQmVXTu5iPCVn9t4FtVpcIzR3XCL3ByujXTomo4ylqf5XeSsbRe6MrXOtfKCfzHcjuwcD8yocw7jR3tkzYN4TfwK7RlMNaGtAaBsbYanYFRxHZnZhrOMnK1v4nRJk6NDdpsdwEcp1n9i0WiWmqHDQ526jaAG28Vs4ioSQCSdw1PT6IDE1csg2O0GZ8NVBnY6kHNhxkjR0Qecee/ywySDDr+9QVp4iqyCXOdOxoAg7u/PoVlPfJnRFSLNouPeqTm2BVbHkaK1z7DrKAvserlqgbHd09bt/wBwC2KrNVz2EMPYf8w810oaHOguDQZuZgc8oJ+ilWBXtseaqeyw5hFVtTt4hV5CVNXARYYSNMkDl6lHswpPirH4Ugae5TTGZ8pMtH5KSaYz5ywCWg8XRbwRLiBu2aEcFawRckbo2k8ArX4MPiRpx3wpaYFY28oxtIkypMw2oWlh6Nlm9NSAHMIKyO3KpdlYNlzz0A+q7CtggKefMNSInvaTMblw+OeJc7iQP+X1P1K1zdZ6mAa0aDYE9OlMbSdB1iTwSY2xJ4eqIwYGa62yCcE8iNDPPzV+NEPkbYPvqEKFROnULbgo3/1BwJ5lBMZKvZRbtJuY2DzUBbe2njQkcjY8xtU29o1nmAC5zrCG6mRsFrcBuV5wtNobABMybTu0Mn3HELSZiqYEtaGugCdsjR07/JALSp1qLZyEkuJeWwSCLaDWYnxUKvbzrAOc07wCDr/mlaFHHg5s8umQNB1P6j+yy+0MNSe7/wCNrGDfmdu2zryACCmv2iDq5x0Op3IKtjSdB4p8Zhg02dNgBbggoQW3dcmBMT9dEV2Xhg9xB0iBpqefu6ARuAfE81ULG4B1M727x67kIAt19WdbhY9RsOtoopYc99s/qHmukDJIXNuEEO2eo1HvetunVs2+wKdLy030g1k66f8ASrYNNLz5q10mlt047/BDMcMrTz81zdHR9h9kms5rRq4geKN+Iewjh3ZXEExNlkdm9qupOD2m4II5jRWdqduOrnO8ySsZdXzAHygkh/4hJa9TxH5Tg8NYwRtM/vJRlNs7NpWl2VhGuxLWPOVpJknZDCUfQwDAwvzCRUe0DgIg8rrN6WcshmFO6ym3DwZPmuqbhqIoh2YZ8xGW34Y/EsvHYZg/ODLZtJiRIB47OazOtaxzfbWKysIbqfYnh9iuKeQSGzAFhz3nr5lbHbuMl0A2H1O/6eaw8pidhtPH2V6OZkcOrtWl0idtgeYnzufFSY+FRnuePv8AdOam4Acp+k6LSGrPkymDZ+n13Jjs97Soqi8ucNSQds/SQUnPJgzfS0JzUsGnSLGLi5mOHBSqU4AcNCNuskXjhr9d0qAvD0TBzHUDjadd3gjHU4giS4m3H66rKp4lzQCD70hROKJ1ug0HOLiAQWjaY0HXyVGIZH4XE8D5zKGFUgDkPfmk2tFzcoFUJzDNOk210sOvqoPqE8ANANFbmzkyYi87TrMn396HjeZQQUqboKgkEGhTraIasZv796qLKkbB/u9Ck98xYADYJjjreUEgZBHXqtHBvljeFj42+kLKYYWj2W4S5p3Ajxv6KVY2Mx+XHA/dVNd3B19Fe38JVRb3R1WGye9DCocoVlT7IWme773qxKtzpKmTuKdXEdU2sQ/Nx/4QrqeJOk7SfFBkq0OYB+MEnZfXdouWOuizijm/0jzcs/tTGODHQbmAOEwCfNX0Krc7mucB3MwnfmgDQ7yua+I8RBDR+bvHyHjfwV559Tq+MbEPzO4aDkEZToTRda7e9+46WQTYMAwDv38/otbBPLWuadIXauMYkJiinUe8bSLn7Dx2IVyB3aDl6lRU3aDl6lQVF5EgEHQXHXXx9FM0zYSIPG4gm8Kpkgg8I9CD4qdR2k7p8ST6qC/D0WwQYPvinq4doE2J8EM1ztl5v9Uz3OOxBYYsXRGwC/r6hQqZZ6DZGwKL2mdDs8k1TXoP7QgmyRYan3dVlOTsUSgZJJOURJwuna32UqmpSB97kFlOmHExoBqruz3Q9s8j1t+6kGZWGNZuhW7eRRXSUXz3Yv0Hmr/lENuPI7eCso1WFjHkC4B4yRe+26vOQi9v9R9ZXK11kZVYCUFhpy+95WjjGtbJaZ5/aFlUa+VhETflbZ6rc+MUZBTpvnDenQaFWsXRyA8ELXMXVdN/diU9V4hZxdVsxTg/NcWiesysnF4jNUL3XvppaIA8EZjMTlaRtOnDeVmUiQQQJOwETJPDatyM2olvqiKFctBv0UM9yDcSbHmfAqpyqJPqSq3beaYp9nX0VQnaDl6lRV2GEuHC55buunVadENfd7RqYy2tpfft8FNUDhqgB3HSRcHg5u0eCtexpHEbhs3W4jp1V2JwzJyscSTo2AdkgSb9Pqk7CvAiJ10jmgDp1I7vK+m3ap4h+wE9SSPAoerTLTcRt6KEoLJjT9/FLPfUqslMEFjGg6mN1pJ5JVDoLW3eZ4omlgKpiGO5uED6qL8A8ENIA4kiEAqS0mYUMBc6D6fdBYjLmOXSyCDzdWNfEafRVKQKC9tSx4qtg15FRaVa3b/KZ5+4QH4PEOyZZsJEQNt9eqIZU7p6eaA7ONyOEjpY+YWgW2OhniDoZM7VmtQjXeWuDWyIMwJAkb9nVAUDIIIJGpjX9v3TYl8uMHd4+5VISQtH/Npbnf0t+6SBzJK4mtQiFGrVDWyenEpnvtJWTisQXHgNFJNW1XVeXGSmZqIMGdd3FRThaZTdqeZRFZrTF9BHgOKqa0F5B0zEfVXYprTMb944SgBcEySSoIpGx2QI5k+z9EdScAAJ0CApEGBxv75BE1H2WasTwj5q5tozO8wB9R4LTbin755381k4FskkagR439ETneNQBAJkExIvolFQpCoajiSIJcI2gk25QAiaVCm1t2NcQYIJMxsIIP3VeDHdf4fUp64uefolpILqOw2X/wCuJ3mpUjwBusmtSYAYDpgEQ4QCdkZZPik8wANtyegMKTxfZs0J066JCrKvadQhoLjZoHGBvOp5nghDWc43J8VD5biAQLJm6j7/AGVQ7nkkSZUXhPUF0qiBgLe+CZTH4T73KCCdNqsDCCZ2tPkq2m/2Vgbxmx8kDYd8OB93WjpI15yPVZaPpvluab7hM8TuhSrF1PCBx+xB+kyjMR2IGNzF5ggHSOiCoVIMxv2nhuRuJxhezLIA4n39Vm7rUzGf/Dt9x90lHJ7kJKoqx9e8DRAJ3GUxWmSVlLLPeJAg3Ea7LbQqwU73kkk6lBYPxHZf1WpTw7XCdeBmPBZLz3jzPmjMNiSGn7nwhSkB16Ra4g+wqlsY6ox1OfzNNjz1B37FjqwJSDzpKinCoMwlYNDpmYmRB2furnV2kHvTblqgqYs7kVBguOamCys4hxgnXYeMq+njdjvHpF1F7CCXcSfqkabSJ0QVPqbvqoZzMlO5oUEEidPe0/dMEkkEnulRSToJN0I4eoUVJm3l6hPTZmIG8oJ0aciTbdx3wnaBNv0u690+CuxdoaIgCJhs+MSNiGZr0d/aUCROCYXEtaJOsefohVKm+CDuQaDqLxEgjXXpsVowjzo1x8SqmVIvEHeCR1RVHtF7dL/zGeRAss+teKf4J/6H/wBD0kZ/6xU/W3/eknp45hSeLlRU6mp97FplBMU6YoidTU8z5qZcY4DSwG/xUDpPE+StBs5vVvPT6+iKfDVQ0kOFvG/pzQxUxLTcabCoON1Qym1RCtphQEUaYi6ZzGhyYvgKl1SdUE6tTvGCdT7O9R+cYiFW83TIHLkgmSCCQTKVuaigSdJJBJp15KVBwBk8VBOEEw4nW5jyv90mmT0d/aUzbA8dPfvVO0eTv7SginTBOgKw7rclcG+4QdB8HmjY3+iLFeVJShJBlKT9SkkiIpikkqiX5ep8grj+T3tTJKLEK2zkqkklQ4V1JJJQPU06lUJJIHSSSQJJJJBJ+pTJJIHSSSQOkkkgtrbOSiz0d/aUkkDBOkkgSOCSSLCSSSQf/9k=",
        category: "heroes",
        isFlipped: false
    },
    {
        // _id: "664dd68f56ef021216049208",
        name: "Captain America",
        imageUrl: "https://www.cnet.com/a/img/resize/8d159fb0c99a75843d3585dd2ae8cc9e6fa12773/hub/2017/08/03/75c3b0ae-5a2d-4d75-b72b-055247b4378f/marvelinfinitywar-captainamerica.jpg?auto=webp&fit=crop&height=1200&width=1200",
        category: "heroes",
        isFlipped: false
    },
    {
        // _id: "664dd7e156ef02121604920a",
        name: "Thor",
        imageUrl: "https://www.denverpost.com/wp-content/uploads/2017/01/thor-the-dark-world.jpg?w=525",
        category: "heroes",
        isFlipped: false
    },
    {
        // _id: "664dd83b56ef02121604920c",
        name: "Wonder Woman",
        imageUrl: "https://static.wikia.nocookie.net/dccu/images/6/6f/JL_Wonder_Woman.jpg/revision/latest?cb=20160914003449",
        category: "heroes",
        isFlipped: false
    },
    {
        // _id: "664dd8d156ef02121604920e",
        name: "Black Panther",
        imageUrl: "https://upload.wikimedia.org/wikipedia/en/9/9f/Black_Panther_OS_Vol_1_2.png",
        category: "heroes",
        isFlipped: false
    },
    {
        // _id: "664dd3d256ef021216049200",
        name: "Deadpool",
        imageUrl: "https://images.unsplash.com/photo-1501432377862-3d0432b87a14?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "heroes",
        isFlipped: false
    },
    {
        // _id: "664dd52956ef021216049204",
        name: "Spiderman",
        imageUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D",
        category: "heroes",
        isFlipped: false
    },
    {
        // _id: "664dd61e56ef021216049206",
        name: "Batman",
        imageUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUWFRgVFhYZGBgaGhoaGhwYGBgaHB4aGhgcGhgYGhocIS4lHB4rHxoYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QGhISGjEhGCE0NDQ0NDQ0MTQ0NDQ0NDQ0NDQ0NDE0NDQ0MTQ0MTQ0NDQ0NDQ0MTQ0NDQ0NDQ0NDQ0NP/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAEAAECAwUGB//EAD8QAAEDAgMFBgQEBAYBBQAAAAEAAhEDIQQSMUFRYXGBBSKRscHwBhOh0TJCUuEUcpKyB2KCosLxJBUWIzTD/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAZEQEBAQEBAQAAAAAAAAAAAAAAARECITH/2gAMAwEAAhEDEQA/APM499FfTE+BPgL/AElUhwI4p2nmqi7eok2UATe31SawC5v75oLGFF0n6oQOHJXseB/0EF7UbhKe3egHFHdn1LQTyViVrUKQF1qYcaLNYbLQwz1qM1pUkXTQVIopjlpkWwqWcESsntnGmlh6tQGHNYcs/rPdZ/uLUcywjcAPBEwnlAVgPHT3y8kXUKx+3MR8ul8zYx1Mn+V1RrHf7XOSrGd21T7hXKvFzzXbdo05aeq5Z+FknmsdOnIJ8Jm+v2Rf8LsQVYR4/ZZVYwqt4Th2ievAAh2YmSYBAG4Xgk6zaOaASsNvD1Qb2W3WCPddDVhs2DVRQrnjYOCllF3HQHTed3Lfw5hV1Bc+9imTe5sJ81FSL4u7U8Ez3gyoOeDrKg9w2T1Q1P5o3D6pKmUkwaIHiptd6qLDKVVVEmuTFyGfU2brfUm/ikx6AglXsKHaVa06IDwpUZBTUTIRjKcrSD8K4rVwrlkUrLTwjrqxmtmmFewoembKxrlphz/x7iS3Dhg/O/6NBP8AdkXW9lYZ1cNdTLCHNDgc7T3TEGGkkbtNbLzz/EOoc1IbA1x/qIH/AOZQnwx23Uw+b5bsubLnIAl2WzRMSIk6cNyzb63OfHsFX4crATmp/wBRHm1cd/iFg3UMHU+YMpe+mxgkHM7OHmI2BrD4hT/91V3sjO4jnrrqdqw/iTFPxLGMqGWUwcg/TOpk3JsEt8JPWhgKvzMPTfMksAJ3ub3XH+oFVP7P1VXwlJoOYfyVHN6FrX+byt0Msn0+Obo0YJlZXalHvW0XX1cKNVkYvDa2UsWVzJTPEhEvwkTJhBOKy0eLIaszyVgf78E4MwOaKArt70qDxrw9hFYhneVNdoab3JAMbp06/dQUhsCT0Hry80nBIu2nVQcUDZk6ikqDw+CNytebKjd72FTadQoBn6p2ujifonewqstVQSx/vqrg5AtPvqEXh2lwUBuGq++q3MKQQudpUzmC38K2GrUSiyjcM+6z2GyJoPutMt2k+yvabLOpVFo4e4VZcT8b955b+mkD4Oe5clgsTlndH/ILuPiWl/5LnES0YV2bpnPkV50Cs1ufHY9k9vNYCSA4ERBG3YrMX2uHtIaIB+64xr1tdm4d72EjYCeYbc+vgpq47H4IqZmVuDx9WfsuiqaLmvgFhDK4Oudh6Fro8iuneFqfGb9DNNkFiUcBZc92rinBxDUpAnbNQAZRqudqPR+KeSZOqz6ixa3EWG3vgrWi46+SrYEQ1qiovOiFxLQeisxDoI97VTWf5IAilFuvoFIuSA05+gQQSSSVBLT76FTYbHp5FVKxhsenkVAxcoyk9snwUyyDBQQMrUwjO6gmsWlhtIQTptkjqtam2yHw9EBHsatRiqahICsokwi/lAiCnbQghaRbSlbeG0WfRZEI/DuSJXH/AOINepTeMtm1aeUn+V0OaN1iz+pcFOs34+9V6V/iM9po0qZ/ETUe3fGUAED9LixzeYXnLsMYBF5AIWb9b5+FTy6kGNBGk2m58eoWg3HOJDKRyDQuJiBtNtBG6Sdm5CFjixjAJJe6IvMtYBG+UZiuxX0WF1UEEtBa0EHU5ZcQdh/LryWdxc12/wAANJoVHkzmqZQSIkU2zMcTUPgukfouV/w8q/8AjuBm1V0HZdjTA6yeq6eq+y6T4xfoUuXO9pfiK36hXN9rOupVjLxQQD2rSIzc0PUorDYOnZWh9wllUHHTmgrxLtENUPkr650VLwihiFflhw5D0VTh6q5xuDw9AURVkSV8JIK5hWsEjqPIqL2ackSylaeXqgGyqbWq8MUhTQVtC0cLTi6CDLrTw4sgvpPJK08NuQdBi0MMy61GKLYxXBik0Na3M9wY39Tpj6AlN/FMg5JeRo5mSuzmadOpnA4kdFpBmEwj3glos38TjZreLnGwQHaHxFhsOJDxWf8A5bsnh+rmbKGO+IP4mgcM+kwNpz36B7k3/Gx3epOBAOZ8A94HYTwmJwLiSHNcIuZ7jdBBkiXCIAMAcd81cD9vdr1MVWdWqGXGANzWt/C0RoBfxUKVUZWEG4BaZ2QSfUISuwAxLZ07skeJ2pqTwAQeECAQTvmbeBWa1Gv2JiKbKhe5wa7Royudc2LhFgSLTO9EfEXaWemG5g7v6jQiJnnpPJZOG7VeycsQdQQIPPeqaj31XE20JgWAHDcs57rW+Nf4a+JKmELmgB9N5Bew6HZI4/YQRqu7w3aLMQ0PoknaWH8YvBt+YSDp9dV5bTpF06Dh6cPVG9l4HEOePlNfmGjmzbq3yEk7itysWPSqBlZvbVNpVz+3WhrG1306fy+657nGpiH21cyiHBpJ2PLYAi5uhzh6tZpqU6NdzJgOdSIm2oylwI6q1Iww2/vciG4bMoObDoNiJmbabEXhMQGlc63AOLwDmiSCFlPbpzC7Pt7thlVjGhjGFjcpLGgF2gl0amw+u9cpUHDj4c/uFJVsAVxpKqfrZX4oeM6HXTZOvSUO/ULQoIVzhpy9FWpvqDZuQWpKj5pSQFMaiAVQxysaURbCkGqNM+Cuaio5FcyyQCsDUQfgAXGB1J0C2KfbOGobPmu3/lB9VxnaOPLBkbzd10E7v3Wf/EE8ytS4zZr02p/iUWNinTGn8oHS8rlO0O2v4pxc6jSa6Sc1JmSdvec5977QFiQxv4rnbJB5zs8E1PElzsrIA2uI05Del60kkaJGIc78bTl0LnOc4HcHDbwaVvdl9jY3EAsLKTxGYtc8ttN3AOFn8Sbbt4GGLGd7adpgk8ANAN2kXWhR7acGuDHFhymIMOMbC8X6CBGsqQYvxH8MPw4LjTywJcGuDwBzGo4wFyTwuwwnxMGtFOq1wDZbmADpvfM0wZ4yddFKvjMAGZm5C9veYG03tcXgy0OdlAiYmTp0QceAQbai9oOydi2MJgYbebgEyIg6gTwEePBaWA7fw8tBoNZnn5xyhzYLTJAu4jPldGwAi61cR2xhWRD2f6Gkn6DzRXOfLpsIL2GodQ0S0O5vkHoJRlX4kqkZWUWBumUnOOM02xTdu7zCeJUcX8WOBAoDuXzCo1pDyY2C7IA1a4G5vsVQq0sSZaMlTUt1mNoP5xws4DaQCUDU+2MQHiox+R4GUFjBTgbQMhDW9IU2dsvDw+sG4k7sU6q9vOC8T1JHBZ1WnlcWFxa7ZeWkbCJ2cFQcSRIMEbxfxB096oO/o/FGBrCMTgsj7APwr8o0i7HOAEc3IergKbwX4WqKrdrDaq3mwgOdzygbpXBioNR3TvjXnA+v02qynjXAztGhFj0OxBvVHFUPfCtGK+c0PnvWD9+b9XUCZQ1QW971GlOLNthvt6qks0gxwNx03Iiq3un+ZVPZYIBXMtMEcrj9vqnZTbvlOZA3XUXSdd3qUQ/d3JJsiSKIY3Xor8tgq2C0+/equiyyIM1VzXKpjbwrmsQEMKIA2qhjb+9yftCoG0n7zYdT/wBq6OZqPc9xcd5JJ0ElPTqwbbjc8BPRUyY4T0lJmvQ+S0yTnE6++SPwVr71movCYjLqJadeHEbvX6gOhwbGPIzSeBOngisRhWCXMc4HYDccht81jUMQNQB0+xW1hsWDAMW2HTmd593UVgYvCVXwW03lv6sjjrtsJPRZpEZhuEbdjhvuvQmVXTu5iPCVn9t4FtVpcIzR3XCL3ByujXTomo4ylqf5XeSsbRe6MrXOtfKCfzHcjuwcD8yocw7jR3tkzYN4TfwK7RlMNaGtAaBsbYanYFRxHZnZhrOMnK1v4nRJk6NDdpsdwEcp1n9i0WiWmqHDQ526jaAG28Vs4ioSQCSdw1PT6IDE1csg2O0GZ8NVBnY6kHNhxkjR0Qecee/ywySDDr+9QVp4iqyCXOdOxoAg7u/PoVlPfJnRFSLNouPeqTm2BVbHkaK1z7DrKAvserlqgbHd09bt/wBwC2KrNVz2EMPYf8w810oaHOguDQZuZgc8oJ+ilWBXtseaqeyw5hFVtTt4hV5CVNXARYYSNMkDl6lHswpPirH4Ugae5TTGZ8pMtH5KSaYz5ywCWg8XRbwRLiBu2aEcFawRckbo2k8ArX4MPiRpx3wpaYFY28oxtIkypMw2oWlh6Nlm9NSAHMIKyO3KpdlYNlzz0A+q7CtggKefMNSInvaTMblw+OeJc7iQP+X1P1K1zdZ6mAa0aDYE9OlMbSdB1iTwSY2xJ4eqIwYGa62yCcE8iNDPPzV+NEPkbYPvqEKFROnULbgo3/1BwJ5lBMZKvZRbtJuY2DzUBbe2njQkcjY8xtU29o1nmAC5zrCG6mRsFrcBuV5wtNobABMybTu0Mn3HELSZiqYEtaGugCdsjR07/JALSp1qLZyEkuJeWwSCLaDWYnxUKvbzrAOc07wCDr/mlaFHHg5s8umQNB1P6j+yy+0MNSe7/wCNrGDfmdu2zryACCmv2iDq5x0Op3IKtjSdB4p8Zhg02dNgBbggoQW3dcmBMT9dEV2Xhg9xB0iBpqefu6ARuAfE81ULG4B1M727x67kIAt19WdbhY9RsOtoopYc99s/qHmukDJIXNuEEO2eo1HvetunVs2+wKdLy030g1k66f8ASrYNNLz5q10mlt047/BDMcMrTz81zdHR9h9kms5rRq4geKN+Iewjh3ZXEExNlkdm9qupOD2m4II5jRWdqduOrnO8ySsZdXzAHygkh/4hJa9TxH5Tg8NYwRtM/vJRlNs7NpWl2VhGuxLWPOVpJknZDCUfQwDAwvzCRUe0DgIg8rrN6WcshmFO6ym3DwZPmuqbhqIoh2YZ8xGW34Y/EsvHYZg/ODLZtJiRIB47OazOtaxzfbWKysIbqfYnh9iuKeQSGzAFhz3nr5lbHbuMl0A2H1O/6eaw8pidhtPH2V6OZkcOrtWl0idtgeYnzufFSY+FRnuePv8AdOam4Acp+k6LSGrPkymDZ+n13Jjs97Soqi8ucNSQds/SQUnPJgzfS0JzUsGnSLGLi5mOHBSqU4AcNCNuskXjhr9d0qAvD0TBzHUDjadd3gjHU4giS4m3H66rKp4lzQCD70hROKJ1ug0HOLiAQWjaY0HXyVGIZH4XE8D5zKGFUgDkPfmk2tFzcoFUJzDNOk210sOvqoPqE8ANANFbmzkyYi87TrMn396HjeZQQUqboKgkEGhTraIasZv796qLKkbB/u9Ck98xYADYJjjreUEgZBHXqtHBvljeFj42+kLKYYWj2W4S5p3Ajxv6KVY2Mx+XHA/dVNd3B19Fe38JVRb3R1WGye9DCocoVlT7IWme773qxKtzpKmTuKdXEdU2sQ/Nx/4QrqeJOk7SfFBkq0OYB+MEnZfXdouWOuizijm/0jzcs/tTGODHQbmAOEwCfNX0Krc7mucB3MwnfmgDQ7yua+I8RBDR+bvHyHjfwV559Tq+MbEPzO4aDkEZToTRda7e9+46WQTYMAwDv38/otbBPLWuadIXauMYkJiinUe8bSLn7Dx2IVyB3aDl6lRU3aDl6lQVF5EgEHQXHXXx9FM0zYSIPG4gm8Kpkgg8I9CD4qdR2k7p8ST6qC/D0WwQYPvinq4doE2J8EM1ztl5v9Uz3OOxBYYsXRGwC/r6hQqZZ6DZGwKL2mdDs8k1TXoP7QgmyRYan3dVlOTsUSgZJJOURJwuna32UqmpSB97kFlOmHExoBqruz3Q9s8j1t+6kGZWGNZuhW7eRRXSUXz3Yv0Hmr/lENuPI7eCso1WFjHkC4B4yRe+26vOQi9v9R9ZXK11kZVYCUFhpy+95WjjGtbJaZ5/aFlUa+VhETflbZ6rc+MUZBTpvnDenQaFWsXRyA8ELXMXVdN/diU9V4hZxdVsxTg/NcWiesysnF4jNUL3XvppaIA8EZjMTlaRtOnDeVmUiQQQJOwETJPDatyM2olvqiKFctBv0UM9yDcSbHmfAqpyqJPqSq3beaYp9nX0VQnaDl6lRV2GEuHC55buunVadENfd7RqYy2tpfft8FNUDhqgB3HSRcHg5u0eCtexpHEbhs3W4jp1V2JwzJyscSTo2AdkgSb9Pqk7CvAiJ10jmgDp1I7vK+m3ap4h+wE9SSPAoerTLTcRt6KEoLJjT9/FLPfUqslMEFjGg6mN1pJ5JVDoLW3eZ4omlgKpiGO5uED6qL8A8ENIA4kiEAqS0mYUMBc6D6fdBYjLmOXSyCDzdWNfEafRVKQKC9tSx4qtg15FRaVa3b/KZ5+4QH4PEOyZZsJEQNt9eqIZU7p6eaA7ONyOEjpY+YWgW2OhniDoZM7VmtQjXeWuDWyIMwJAkb9nVAUDIIIJGpjX9v3TYl8uMHd4+5VISQtH/Npbnf0t+6SBzJK4mtQiFGrVDWyenEpnvtJWTisQXHgNFJNW1XVeXGSmZqIMGdd3FRThaZTdqeZRFZrTF9BHgOKqa0F5B0zEfVXYprTMb944SgBcEySSoIpGx2QI5k+z9EdScAAJ0CApEGBxv75BE1H2WasTwj5q5tozO8wB9R4LTbin755381k4FskkagR439ETneNQBAJkExIvolFQpCoajiSIJcI2gk25QAiaVCm1t2NcQYIJMxsIIP3VeDHdf4fUp64uefolpILqOw2X/wCuJ3mpUjwBusmtSYAYDpgEQ4QCdkZZPik8wANtyegMKTxfZs0J066JCrKvadQhoLjZoHGBvOp5nghDWc43J8VD5biAQLJm6j7/AGVQ7nkkSZUXhPUF0qiBgLe+CZTH4T73KCCdNqsDCCZ2tPkq2m/2Vgbxmx8kDYd8OB93WjpI15yPVZaPpvluab7hM8TuhSrF1PCBx+xB+kyjMR2IGNzF5ggHSOiCoVIMxv2nhuRuJxhezLIA4n39Vm7rUzGf/Dt9x90lHJ7kJKoqx9e8DRAJ3GUxWmSVlLLPeJAg3Ea7LbQqwU73kkk6lBYPxHZf1WpTw7XCdeBmPBZLz3jzPmjMNiSGn7nwhSkB16Ra4g+wqlsY6ox1OfzNNjz1B37FjqwJSDzpKinCoMwlYNDpmYmRB2furnV2kHvTblqgqYs7kVBguOamCys4hxgnXYeMq+njdjvHpF1F7CCXcSfqkabSJ0QVPqbvqoZzMlO5oUEEidPe0/dMEkkEnulRSToJN0I4eoUVJm3l6hPTZmIG8oJ0aciTbdx3wnaBNv0u690+CuxdoaIgCJhs+MSNiGZr0d/aUCROCYXEtaJOsefohVKm+CDuQaDqLxEgjXXpsVowjzo1x8SqmVIvEHeCR1RVHtF7dL/zGeRAss+teKf4J/6H/wBD0kZ/6xU/W3/eknp45hSeLlRU6mp97FplBMU6YoidTU8z5qZcY4DSwG/xUDpPE+StBs5vVvPT6+iKfDVQ0kOFvG/pzQxUxLTcabCoON1Qym1RCtphQEUaYi6ZzGhyYvgKl1SdUE6tTvGCdT7O9R+cYiFW83TIHLkgmSCCQTKVuaigSdJJBJp15KVBwBk8VBOEEw4nW5jyv90mmT0d/aUzbA8dPfvVO0eTv7SginTBOgKw7rclcG+4QdB8HmjY3+iLFeVJShJBlKT9SkkiIpikkqiX5ep8grj+T3tTJKLEK2zkqkklQ4V1JJJQPU06lUJJIHSSSQJJJJBJ+pTJJIHSSSQOkkkgtrbOSiz0d/aUkkDBOkkgSOCSSLCSSSQf/9k=",
        category: "heroes",
        isFlipped: false
    },
    {
        // _id: "664dd68f56ef021216049208",
        name: "Captain America",
        imageUrl: "https://www.cnet.com/a/img/resize/8d159fb0c99a75843d3585dd2ae8cc9e6fa12773/hub/2017/08/03/75c3b0ae-5a2d-4d75-b72b-055247b4378f/marvelinfinitywar-captainamerica.jpg?auto=webp&fit=crop&height=1200&width=1200",
        category: "heroes",
        isFlipped: false
    },
    {
        // _id: "664dd7e156ef02121604920a",
        name: "Thor",
        imageUrl: "https://www.denverpost.com/wp-content/uploads/2017/01/thor-the-dark-world.jpg?w=525",
        category: "heroes",
        isFlipped: false
    },
    {
        // _id: "664dd83b56ef02121604920c",
        name: "Wonder Woman",
        imageUrl: "https://static.wikia.nocookie.net/dccu/images/6/6f/JL_Wonder_Woman.jpg/revision/latest?cb=20160914003449",
        category: "heroes",
        isFlipped: false
    },
    {
        // _id: "664dd8d156ef02121604920e",
        name: "Black Panther",
        imageUrl: "https://upload.wikimedia.org/wikipedia/en/9/9f/Black_Panther_OS_Vol_1_2.png",
        category: "heroes",
        isFlipped: false
    },
    {
        name: "Scarlet Witch",
        imageUrl: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/9/97/Scarlet_Witch.jpg/revision/latest?cb=20231021153444",
        category: "heroes",
        isFlipped: false
    },
    {
        name: "Scarlet Witch",
        imageUrl: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/9/97/Scarlet_Witch.jpg/revision/latest?cb=20231021153444",
        category: "heroes",
        isFlipped: false
    }
]
const data:FlipCard[] = items;

const Gameplay = () => {
    const navigate = useNavigate()
    const baseScore = 1000;

    const [match, setMatch] = useState<number>(0);
    const [mismatch, setMisMatch] = useState<number>(0);
    const [moves, setMoves] = useState<number>(0);
    const [cards, setCards] = useState<FlipCard[]>([]);
    const [score, setScore] = useState<number>(0);
    const [timeTaken, setTimeTaken] = useState<number>(0)
    const [flippedCards, setFlippedCards] = useState<number[]>([]);

    const shuffleArray = (list:FlipCard[]) => {
        var currentIndex = list.length; 
        var randomIndex;
        var temporaryValue;

        while (currentIndex !== 0){
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = list[currentIndex];
            list[currentIndex] = list[randomIndex];
            list[randomIndex] = temporaryValue
        }

        setCards(list)
    }

    useEffect(() => {
        shuffleArray(data);
    }, [])

    useEffect(() => {
        if(match !== 8){
            const interval = setInterval(() => {
                setTimeTaken((timeTaken) => timeTaken + 1)
            }, 1000)
            return () => clearInterval(interval)
        } else {
            let sc = baseScore - (2 * timeTaken) - (2 * moves) - (2 * mismatch)
            setScore(sc)
        }
    },[match])

    useEffect(() => {
        if(flippedCards.length === 2){
            const [first, second] = flippedCards;
            if(cards[first].name === cards[second].name){
                console.log(cards[first].name,cards[second].name)
                setTimeout(() => {
                    setFlippedCards([])
                }, 500);
                setMatch((match) => match + 1)
            } else {
                setMisMatch(mismatch => mismatch + 1)
                setTimeout(() => {
                    let newCards = [...cards]
                    flippedCards.map((item) => {
                        newCards[item].isFlipped = false;
                    })
                    setCards(newCards);
                    setFlippedCards([]);
                }, 500);
            }
        }
    },[flippedCards])

    const handleCardClick = (index:number) => {
        if(!cards[index].isFlipped){
            setMoves((moves) => moves + 1)
        }
        if(flippedCards.length < 2 && !cards[index].isFlipped){
            const newCards = [...cards]
            newCards[index].isFlipped = true;
            console.log(newCards)
            setCards(newCards);
            setFlippedCards([...flippedCards, index])
        }
    }

    const quitGame = () => {
        navigate('/')
    }

    // score=baseScore−(timeFactor×timeTaken)−(flipFactor×numberOfFlips)

  return (
    <section className="flex flex-col gap-2 h-svh w-full container mx-auto">
        <section className="flex justify-between items-center text-lg">
            <div className="flex gap-4 items-center">
                <p>Moves: <span>{moves}</span></p>
                <p>Match: <span>{match}</span>/{cards.length / 2}</p>
                <p>Mismatch: <span>{mismatch}</span> </p>
                <p>Time Count: <span>{timeTaken}</span> </p>
            </div>
            <p onClick={quitGame} className="cursor-pointer">Quit</p>
        </section>

        <section className="grid grid-cols-4 grid-rows-4 flex-1 gap-0.5 mb-2">
            {cards.map((i, index) => {
                return (<div key={index} onClick={() => handleCardClick(index)} className={`${i.isFlipped ? 'flipped' : 'bg-blueLagoon'} card flex justify-center relative overflow-hidden items-center text-lightBg`}>
                    <img className={`${i.isFlipped ? 'opacity-100' : 'opacity-0'} transition-all w-[100%] h-[100%] object-center object-cover absolute top-0 left-0`} src={i.imageUrl} alt={i.name} />
                    {/* <p className={`${i.isFlipped ? 'opacity-100 ' : 'opacity-0'} transition-all font-semibold text-lg`}>{i.name}</p> */}
                </div>)
            })}
        </section>

        { match === cards.length/2 && <Result score={score} flips={moves} timetaken={timeTaken} mismatch={mismatch}/>}
    </section> 
  )
}

export default Gameplay