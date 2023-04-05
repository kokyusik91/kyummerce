// import React from 'react'
// import { GoogleLogin } from '@react-oauth/google'

// function Google() {
//   return (
//     <div style={{ display: 'flex' }}>
//       <h1>구글 OAuth 로그인!</h1>
//       <GoogleLogin
//         onSuccess={(credentialResponse) => {
//           fetch(`/api/auth/sign-up?credential=${credentialResponse.credential}`)
//             .then((res) => res.json())
//             .then((data) => console.log(data))
//           // console.log(credentialResponse)
//         }}
//         onError={() => {
//           console.log('Login Failed')
//         }}
//       />
//     </div>
//   )
// }

// export default Google

// {
//   aud: '515109303412-vgk1rcfm0rl57l25c96qpkdetjdsl88e.apps.googleusercontent.com'
//   azp: '515109303412-vgk1rcfm0rl57l25c96qpkdetjdsl88e.apps.googleusercontent.com'
//   email: 'kokyusik91@gmail.com'
//   email_verified: true
//   exp: 1680588226
//   family_name: '곡식'
//   given_name: '곡식'
//   iat: 1680584626
//   iss: 'https://accounts.google.com'
//   jti: '3dee35c6d95d5b3c27248f9bab07120e0583995d'
//   name: '곡식곡식'
//   nbf: 1680584326
//   picture: 'https://lh3.googleusercontent.com/a/AGNmyxZ3TvYAoc9XPsFGpCrI9veXIgyxNe8jo4XFLsR7lA=s96-c'
//   sub: '100300564087654932203'
// }

export default {}
