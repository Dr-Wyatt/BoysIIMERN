import React, { Component } from 'react';
import TabsTest from './tabContent';
import Comments from '../Comments/commentSection';

function RenderTabs(props) {
    // console.log("rendertabs", props)
    return (
        <div>
            <TabsTest>
                <div label="Comments">
                    <Comments comments={props.comments}/>
                </div>
                <div label="Photo Gallery">
                   <p>The photo gallery goes here!</p>
                </div>
                <div label="Superlatives">
                    <p>Superlatives are assigned here!</p>
                </div>
            </TabsTest>
        </div>
    );

}
export default RenderTabs;