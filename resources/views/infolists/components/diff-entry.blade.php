<div
    x-data="{
    diff: @js($getDiff()),
    init() {
        this.render();
    },
    render() {
        if (!this.diff) return;

        const target = this.$refs.diffContainer;
        const diffHtml = Diff2Html.html(this.diff, @js($getDiff2HtmlOptions()));
        target.innerHTML = diffHtml;
    }
}"
    x-init="init"
    wire:ignore
    @class(['d2h-hide-tags' => $getHideFileTags()])
>
    <div x-ref="diffContainer"></div>
</div>
