import { Card, Grid } from "@tremor/react";
import React from "react";

export default function() {
    return <><Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
        <Card>
            <div className="h-28" />
        </Card>
        <Card>
            <div className="h-28" />
        </Card>
        <Card>
            <div className="h-28" />
        </Card>
    </Grid>
        <div className="mt-6">
            <Card>
                <div className="h-80" />
            </Card>
        </div></>
}
