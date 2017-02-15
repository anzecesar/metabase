/* @flow */

import React, { Component, PropTypes } from "react";

import Select, { Option } from "metabase/components/Select";
import CopyButton from "metabase/components/CopyButton";

import AceEditor from "metabase/components/TextEditor";

import _ from "underscore";

type Props = {
    className?: string,
    title?: string,
    options?: Array<{ name: string, value: string, source: () => string, mode: string }>
};

type State = {
    name: string,
};

export default class CodeSample extends Component<*, Props, State> {
    state: State;

    static defaultProps = {
        className: "bordered rounded shadowed relative"
    }

    constructor(props: Props) {
        super(props);
        this.state = {
            name: props.options[0].name
        };
    }
    render() {
        const { className, title, options } = this.props;
        const { name } = this.state;
        const selected = _.findWhere(options, { name });
        const source = selected && selected.source()
        return (
            <div>
                { (title || (options && options.length > 1)) &&
                    <div className="mt2 flex align-center">
                        <h4>{title}</h4>
                        { options && options.length > 1 ?
                            <Select
                                className="AdminSelect--borderless ml-auto pt1 pb1"
                                value={name}
                                onChange={(e) => this.setState({ name: e.target.value })}
                            >
                                { options.map(option =>
                                    <Option value={option.name}>{option.name}</Option>
                                )}
                            </Select>
                        : null }
                    </div>
                }
                <div className={className}>
                    <AceEditor
                        className="z1"
                        value={source}
                        mode={selected && selected.mode}
                        theme="ace/theme/metabase"
                        sizeToFit readOnly
                    />
                    { source &&
                        <div className="absolute top right text-brand-hover cursor-pointer z2">
                            <CopyButton className="p1" value={source} />
                        </div>
                    }
                </div>
            </div>
        )
    }
}
