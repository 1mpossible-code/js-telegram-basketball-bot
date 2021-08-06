import { Context, Scenes } from 'telegraf'
/**
 * We can define our own context object.
 *
 * We now have to set the scene object under the `scene` property. As we extend
 * the scene session, we need to pass the type in as a type variable.
 */
interface MyContext extends Context {
    // declare scene type
    scene: Scenes.SceneContextScene<MyContext, Scenes.SceneSessionData>
}

export default MyContext